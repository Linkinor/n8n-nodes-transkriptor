import type { INodeProperties } from 'n8n-workflow';
import { transcriptionUploadDescription } from './upload';
import { transcriptionMeetingDescription } from './meeting';

const showOnlyForTranscription = {
	resource: ['transcription'],
};

export const transcriptionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTranscription },
		options: [
			{
				name: 'Transcribe Meeting',
				value: 'meeting',
				action: 'Transcribe a live meeting',
				description:
					'Send a bot to join and transcribe a Google Meet, Microsoft Teams, or Zoom meeting',
			},
			{
				name: 'Upload File',
				value: 'upload',
				action: 'Upload a file for transcription',
				description: 'Upload a local audio or video file for transcription',
			},
		],
		default: 'meeting',
	},
	...transcriptionUploadDescription,
	...transcriptionMeetingDescription,
];
