import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookDelete = {
	operation: ['delete'],
	resource: ['webhook'],
};

export const webhookDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Webhook Type',
		name: 'webhookType',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForWebhookDelete },
		placeholder: 'e.g. wh 2025-05-02 12:34:56',
		description: 'The ID/type of the webhook to delete',
		routing: {
			send: {
				type: 'body',
				property: 'webhookType',
			},
		},
	},
];
