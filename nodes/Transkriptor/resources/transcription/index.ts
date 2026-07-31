import type { INodeProperties } from 'n8n-workflow';
import { transcriptionUrlDescription } from './upload';
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
				name: 'Transcribe From URL',
				value: 'transcribeUrl',
				action: 'Transcribe from a URL',
				description:
					'Transcribe audio/video from a URL (YouTube, Google Drive, Dropbox, OneDrive)',
			},
			{
				name: 'Transcribe Meeting',
				value: 'meeting',
				action: 'Transcribe a live meeting',
				description:
					'Send a bot to join and transcribe a Google Meet, Microsoft Teams, or Zoom meeting',
			},
		],
		default: 'transcribeUrl',
	},
	...transcriptionUrlDescription,
	...transcriptionMeetingDescription,
];
