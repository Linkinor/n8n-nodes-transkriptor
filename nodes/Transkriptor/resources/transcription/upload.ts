import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpload = {
	operation: ['upload'],
	resource: ['transcription'],
};

export const transcriptionUploadDescription: INodeProperties[] = [
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForUpload },
		placeholder: 'e.g. interview.mp3',
		description: 'The name of the file to upload for transcription',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		required: true,
		default: 'en-US',
		displayOptions: { show: showOnlyForUpload },
		placeholder: 'e.g. en-US, tr-TR, de-DE',
		description: 'Language code in ISO format for the transcription',
	},
	{
		displayName: 'Service',
		name: 'service',
		type: 'options',
		required: true,
		displayOptions: { show: showOnlyForUpload },
		options: [
			{ name: 'Standard', value: 'Standard' },
			{ name: 'Subtitle', value: 'Subtitle' },
		],
		default: 'Standard',
		description: 'Type of transcription service to use',
	},
	{
		displayName: 'Options',
		name: 'uploadOptions',
		type: 'collection',
		displayOptions: { show: showOnlyForUpload },
		default: {},
		options: [
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'ID of the folder for storage (default is "Recent Files")',
			},
			{
				displayName: 'Triggering Word',
				name: 'triggeringWord',
				type: 'string',
				default: '',
				description: 'A specific word to trigger a new line break in the transcription',
			},
		],
	},
];
