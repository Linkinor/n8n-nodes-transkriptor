import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTranscriptGet = {
	operation: ['get'],
	resource: ['transcript'],
};

export const transcriptGetDescription: INodeProperties[] = [
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForTranscriptGet },
		description: 'The ID of the transcription order to retrieve',
	},
];
