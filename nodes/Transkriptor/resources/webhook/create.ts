import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookCreate = {
	operation: ['create'],
	resource: ['webhook'],
};

export const webhookCreateDescription: INodeProperties[] = [
	{
		displayName: 'Webhook URL',
		name: 'webhookUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForWebhookCreate },
		placeholder: 'https://your-site.com/webhook',
		description: 'The URL where transcription notifications will be sent',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Options',
		name: 'webhookCreateOptions',
		type: 'collection',
		displayOptions: { show: showOnlyForWebhookCreate },
		default: {},
		options: [
			{
				displayName: 'Export Format',
				name: 'exportFormat',
				type: 'options',
				options: [
					{ name: 'CSV', value: 'Csv' },
					{ name: 'JSON', value: 'Json' },
					{ name: 'TXT', value: 'Txt' },
				],
				default: 'Txt',
				description: 'The format of the transcript in the webhook payload',
				routing: {
					send: {
						type: 'body',
						property: 'export_format',
					},
				},
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description:
					'Only send notifications for transcriptions in this folder',
				routing: {
					send: {
						type: 'body',
						property: 'folder_id',
					},
				},
			},
			{
				displayName: 'Include Speaker Names',
				name: 'includeSpeakerNames',
				type: 'boolean',
				default: false,
				description: 'Whether to include speaker names in the webhook payload',
				routing: {
					send: {
						type: 'body',
						property: 'include_speaker_names',
					},
				},
			},
			{
				displayName: 'Include Timestamps',
				name: 'includeTimestamps',
				type: 'boolean',
				default: false,
				description: 'Whether to include timestamps in the webhook payload',
				routing: {
					send: {
						type: 'body',
						property: 'include_timestamps',
					},
				},
			},
			{
				displayName: 'Merge Same Speaker Segments',
				name: 'mergeSameSpeakerSegments',
				type: 'boolean',
				default: false,
				description: 'Whether to combine consecutive segments from the same speaker',
				routing: {
					send: {
						type: 'body',
						property: 'merge_same_speaker_segments',
					},
				},
			},
			{
				displayName: 'Paragraph Size',
				name: 'paragraphSize',
				type: 'options',
				options: [
					{ name: '1 Sentence', value: 1 },
					{ name: '2 Sentences', value: 2 },
					{ name: '4 Sentences', value: 4 },
					{ name: '8 Sentences', value: 8 },
				],
				default: 1,
				description: 'Number of sentences per paragraph',
				routing: {
					send: {
						type: 'body',
						property: 'paragraph_size',
					},
				},
			},
		],
	},
];
