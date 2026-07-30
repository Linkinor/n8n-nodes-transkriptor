import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookUpdate = {
	operation: ['update'],
	resource: ['webhook'],
};

export const webhookUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Webhook Type',
		name: 'webhookType',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForWebhookUpdate },
		placeholder: 'e.g. wh 2025-05-02 12:34:56',
		description: 'The ID/type of the webhook to update',
		routing: {
			send: {
				type: 'body',
				property: 'webhookType',
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'webhookUpdateFields',
		type: 'collection',
		displayOptions: { show: showOnlyForWebhookUpdate },
		default: {},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'New URL for the webhook',
				routing: {
					send: {
						type: 'body',
						property: 'url',
					},
				},
			},
			{
				displayName: 'Export Format',
				name: 'exportFormat',
				type: 'options',
				options: [
					{ name: 'TXT', value: 'Txt' },
					{ name: 'JSON', value: 'Json' },
					{ name: 'CSV', value: 'Csv' },
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
				displayName: 'Include Timestamps',
				name: 'includeTimestamps',
				type: 'boolean',
				default: false,
				description: 'Whether to include timestamps',
				routing: {
					send: {
						type: 'body',
						property: 'include_timestamps',
					},
				},
			},
			{
				displayName: 'Include Speaker Names',
				name: 'includeSpeakerNames',
				type: 'boolean',
				default: false,
				description: 'Whether to include speaker names',
				routing: {
					send: {
						type: 'body',
						property: 'include_speaker_names',
					},
				},
			},
		],
	},
];
