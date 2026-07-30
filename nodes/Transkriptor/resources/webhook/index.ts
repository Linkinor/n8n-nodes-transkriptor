import type { INodeProperties } from 'n8n-workflow';
import { webhookCreateDescription } from './create';
import { webhookGetDescription } from './get';
import { webhookUpdateDescription } from './update';
import { webhookDeleteDescription } from './deleteWebhook';

const showOnlyForWebhook = {
	resource: ['webhook'],
};

export const webhookDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForWebhook },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a webhook',
				description: 'Create a new webhook to receive transcription notifications',
				routing: {
					request: {
						method: 'POST',
						url: '/developer/integrations/webhooks',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a webhook',
				description: 'Remove a webhook to stop receiving notifications',
				routing: {
					request: {
						method: 'DELETE',
						url: '/developer/integrations/webhooks',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a webhook',
				description: 'Retrieve details of a specific webhook',
				routing: {
					request: {
						method: 'GET',
						url: '/developer/integrations/webhooks',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many webhooks',
				description: 'Retrieve many registered webhooks',
				routing: {
					request: {
						method: 'GET',
						url: '/developer/integrations/webhooks',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a webhook',
				description: 'Update an existing webhook\'s settings',
				routing: {
					request: {
						method: 'PUT',
						url: '/developer/integrations/webhooks',
					},
				},
			},
		],
		default: 'getAll',
	},
	...webhookCreateDescription,
	...webhookGetDescription,
	...webhookUpdateDescription,
	...webhookDeleteDescription,
];
