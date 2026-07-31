import type { INodeProperties } from 'n8n-workflow';
import { supportedLanguages } from '../../shared/languages';

const showOnlyForMeeting = {
	operation: ['meeting'],
	resource: ['transcription'],
};

export const transcriptionMeetingDescription: INodeProperties[] = [
	{
		displayName: 'Meeting URL',
		name: 'meetingUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForMeeting },
		placeholder: 'e.g. https://meet.google.com/abc-defg-hij',
		description: 'The meeting link for Google Meet, Microsoft Teams, or Zoom',
	},
	{
		displayName: 'Options',
		name: 'meetingOptions',
		type: 'collection',
		displayOptions: { show: showOnlyForMeeting },
		default: {},
		options: [
			{
				displayName: 'Bot Name',
				name: 'meetingBotName',
				type: 'string',
				default: '',
				description:
					'Custom bot name for Teams or Zoom meetings (not configurable for Google Meet)',
			},
			{
				displayName: 'Language',
				name: 'meetingLanguage',
				type: 'options',
				default: 'en-US',
				description: 'Language for the transcription',
				options: supportedLanguages,
			},
			{
				displayName: 'Summary Template ID',
				name: 'summaryTemplateId',
				type: 'string',
				default: '',
				description: 'ID of the summary template to apply to the transcription',
			},
		],
	},
];
