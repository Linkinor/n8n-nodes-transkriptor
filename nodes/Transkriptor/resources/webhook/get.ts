import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookGet = {
	operation: ['get'],
	resource: ['webhook'],
};

export const webhookGetDescription: INodeProperties[] = [
	{
		displayName: 'Webhook Type',
		name: 'webhookType',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForWebhookGet },
		placeholder: 'e.g. wh 2025-05-02 12:34:56',
		description: 'The ID/type of the webhook to retrieve',
		routing: {
			send: {
				type: 'query',
				property: 'webhookType',
			},
		},
	},
];
