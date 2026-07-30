import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

import { transkriptorApiRequest } from './shared/transport';
import { transcriptDescription } from './resources/transcript';
import { transcriptionDescription } from './resources/transcription';
import { webhookDescription } from './resources/webhook';

export class Transkriptor implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Transkriptor',
		name: 'transkriptor',
		icon: { light: 'file:transkriptor.svg', dark: 'file:transkriptor.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'AI-powered transcription service supporting 100+ languages with speaker recognition, timestamps, and automated summaries',
		defaults: {
			name: 'Transkriptor',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'transkriptorApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.tor.app',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Transcript',
						value: 'transcript',
						description: 'Manage and retrieve transcription results',
					},
					{
						name: 'Transcription',
						value: 'transcription',
						description: 'Start new transcriptions from files or meetings',
					},
					{
						name: 'Webhook',
						value: 'webhook',
						description:
							'Manage webhooks to receive notifications when transcriptions complete',
					},
				],
				default: 'transcript',
			},
			...transcriptDescription,
			...transcriptionDescription,
			...webhookDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[];

				if (resource === 'transcript') {
					responseData = await handleTranscript.call(this, operation, i);
				} else if (resource === 'transcription') {
					responseData = await handleTranscription.call(this, operation, i);
				} else if (resource === 'webhook') {
					responseData = await handleWebhook.call(this, operation, i);
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`, {
						itemIndex: i,
					});
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
				} else {
					throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}

async function handleTranscript(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'getAll') {
		return (await transkriptorApiRequest.call(this, 'GET', '/developer/files')) as IDataObject;
	}

	if (operation === 'get') {
		const orderId = this.getNodeParameter('orderId', itemIndex) as string;
		return (await transkriptorApiRequest.call(
			this,
			'GET',
			`/developer/files/${orderId}/content`,
		)) as IDataObject;
	}

	if (operation === 'export') {
		const orderId = this.getNodeParameter('orderId', itemIndex) as string;
		const exportType = this.getNodeParameter('exportType', itemIndex) as string;
		const exportOptions = this.getNodeParameter('exportOptions', itemIndex, {}) as IDataObject;

		const body: IDataObject = {
			export_type: exportType,
			include_speaker_names: exportOptions.includeSpeakerNames ?? true,
			include_timestamps: exportOptions.includeTimestamps ?? true,
			merge_same_speaker_segments: exportOptions.mergeSameSpeakerSegments ?? false,
			is_single_paragraph: exportOptions.isSingleParagraph ?? false,
			paragraph_size: exportOptions.paragraphSize ?? 1,
		};

		return (await transkriptorApiRequest.call(
			this,
			'POST',
			`/developer/files/${orderId}/content/export`,
			body,
		)) as IDataObject;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

async function handleTranscription(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'meeting') {
		const meetingUrl = this.getNodeParameter('meetingUrl', itemIndex) as string;
		const meetingOptions = this.getNodeParameter('meetingOptions', itemIndex, {}) as IDataObject;

		const body: IDataObject = {
			meetingUrl,
		};

		if (meetingOptions.meetingBotName) {
			body.meeting_bot_name = meetingOptions.meetingBotName;
		}
		if (meetingOptions.meetingLanguage) {
			body.meeting_language = meetingOptions.meetingLanguage;
		}
		if (meetingOptions.summaryTemplateId) {
			body.summary_template_id = meetingOptions.summaryTemplateId;
		}

		return (await transkriptorApiRequest.call(
			this,
			'POST',
			'/developer/transcription/meeting',
			body,
		)) as IDataObject;
	}

	if (operation === 'upload') {
		const fileName = this.getNodeParameter('fileName', itemIndex) as string;
		const language = this.getNodeParameter('language', itemIndex) as string;
		const service = this.getNodeParameter('service', itemIndex) as string;
		const uploadOptions = this.getNodeParameter('uploadOptions', itemIndex, {}) as IDataObject;

		const uploadUrlBody: IDataObject = { file_name: fileName };
		const uploadUrlResponse = (await transkriptorApiRequest.call(
			this,
			'POST',
			'/developer/transcription/local_file/get_upload_url',
			uploadUrlBody,
		)) as IDataObject;

		const initiateBody: IDataObject = {
			url: uploadUrlResponse.public_url as string,
			language,
			service,
		};

		if (uploadOptions.folderId) {
			initiateBody.folder_id = uploadOptions.folderId;
		}
		if (uploadOptions.triggeringWord) {
			initiateBody.triggering_word = uploadOptions.triggeringWord;
		}

		const transcriptionResponse = (await transkriptorApiRequest.call(
			this,
			'POST',
			'/developer/transcription/local_file/initiate_transcription',
			initiateBody,
		)) as IDataObject;

		return {
			...transcriptionResponse,
			upload_url: uploadUrlResponse.upload_url,
			public_url: uploadUrlResponse.public_url,
		} as IDataObject;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

async function handleWebhook(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'getAll') {
		return (await transkriptorApiRequest.call(
			this,
			'GET',
			'/developer/integrations/webhooks',
		)) as IDataObject;
	}

	if (operation === 'get') {
		const webhookType = this.getNodeParameter('webhookType', itemIndex) as string;
		return (await transkriptorApiRequest.call(
			this,
			'GET',
			'/developer/integrations/webhooks',
			undefined,
			{ webhookType },
		)) as IDataObject;
	}

	if (operation === 'create') {
		const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex) as string;
		const options = this.getNodeParameter('webhookCreateOptions', itemIndex, {}) as IDataObject;

		const body: IDataObject = { url: webhookUrl };

		if (options.exportFormat) body.export_format = options.exportFormat;
		if (options.includeTimestamps !== undefined)
			body.include_timestamps = options.includeTimestamps;
		if (options.includeSpeakerNames !== undefined)
			body.include_speaker_names = options.includeSpeakerNames;
		if (options.mergeSameSpeakerSegments !== undefined)
			body.merge_same_speaker_segments = options.mergeSameSpeakerSegments;
		if (options.folderId) body.folder_id = options.folderId;
		if (options.paragraphSize) body.paragraph_size = options.paragraphSize;

		return (await transkriptorApiRequest.call(
			this,
			'POST',
			'/developer/integrations/webhooks',
			body,
		)) as IDataObject;
	}

	if (operation === 'update') {
		const webhookType = this.getNodeParameter('webhookType', itemIndex) as string;
		const updateFields = this.getNodeParameter(
			'webhookUpdateFields',
			itemIndex,
			{},
		) as IDataObject;

		const body: IDataObject = { webhookType };

		if (updateFields.url) body.url = updateFields.url;
		if (updateFields.exportFormat) body.export_format = updateFields.exportFormat;
		if (updateFields.includeTimestamps !== undefined)
			body.include_timestamps = updateFields.includeTimestamps;
		if (updateFields.includeSpeakerNames !== undefined)
			body.include_speaker_names = updateFields.includeSpeakerNames;

		return (await transkriptorApiRequest.call(
			this,
			'PUT',
			'/developer/integrations/webhooks',
			body,
		)) as IDataObject;
	}

	if (operation === 'delete') {
		const webhookType = this.getNodeParameter('webhookType', itemIndex) as string;
		return (await transkriptorApiRequest.call(
			this,
			'DELETE',
			'/developer/integrations/webhooks',
			{ webhookType },
		)) as IDataObject;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}
