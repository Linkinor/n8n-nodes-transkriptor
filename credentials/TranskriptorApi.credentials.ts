import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TranskriptorApi implements ICredentialType {
	name = 'transkriptorApi';

	displayName = 'Transkriptor API';

	icon: Icon = {
		light: 'file:../nodes/Transkriptor/transkriptor.svg',
		dark: 'file:../nodes/Transkriptor/transkriptor.dark.svg',
	};

	documentationUrl = 'https://developer.transkriptor.com/docs/authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your Transkriptor API key. Find it at https://app.transkriptor.com/app/api-key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.tor.app',
			url: '/developer/files',
			method: 'GET',
		},
	};
}
