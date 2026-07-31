import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUrl = {
	operation: ['transcribeUrl'],
	resource: ['transcription'],
};

export const transcriptionUrlDescription: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'sourceUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForUrl },
		placeholder: 'e.g. https://www.youtube.com/watch?v=...',
		description:
			'The URL of the file to transcribe (YouTube, Google Drive, Dropbox, OneDrive, or any public audio/video URL)',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		required: true,
		default: 'en-US',
		displayOptions: { show: showOnlyForUrl },
		placeholder: 'e.g. en-US, tr-TR, de-DE',
		description: 'Language code in ISO format for the transcription',
	},
	{
		displayName: 'Service',
		name: 'service',
		type: 'options',
		required: true,
		displayOptions: { show: showOnlyForUrl },
		options: [
			{ name: 'Standard', value: 'Standard' },
			{ name: 'Subtitle', value: 'Subtitle' },
		],
		default: 'Standard',
		description: 'Type of transcription service to use',
	},
	{
		displayName: 'Options',
		name: 'urlOptions',
		type: 'collection',
		displayOptions: { show: showOnlyForUrl },
		default: {},
		options: [
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				default: '',
				description: 'Custom name for the transcription file',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'ID of the folder for storage (default is "Recent Files")',
			},
		],
	},
];
