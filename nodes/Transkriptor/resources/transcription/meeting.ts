import type { INodeProperties } from 'n8n-workflow';

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
				type: 'string',
				default: 'en-US',
				placeholder: 'e.g. en-US, tr-TR, de-DE',
				description: 'Language code in ISO format for the transcription',
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
