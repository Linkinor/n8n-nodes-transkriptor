import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTranscriptExport = {
	operation: ['export'],
	resource: ['transcript'],
};

export const transcriptExportDescription: INodeProperties[] = [
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showOnlyForTranscriptExport },
		description: 'The ID of the transcription order to export',
	},
	{
		displayName: 'Export Format',
		name: 'exportType',
		type: 'options',
		required: true,
		displayOptions: { show: showOnlyForTranscriptExport },
		options: [
			{ name: 'DOCX', value: 'docx' },
			{ name: 'PDF', value: 'pdf' },
			{ name: 'SRT', value: 'srt' },
			{ name: 'TXT', value: 'txt' },
		],
		default: 'txt',
		description: 'The format to export the transcription in',
	},
	{
		displayName: 'Options',
		name: 'exportOptions',
		type: 'collection',
		displayOptions: { show: showOnlyForTranscriptExport },
		default: {},
		options: [
			{
				displayName: 'Include Speaker Names',
				name: 'includeSpeakerNames',
				type: 'boolean',
				default: true,
				description: 'Whether to include speaker labels in the export',
			},
			{
				displayName: 'Include Timestamps',
				name: 'includeTimestamps',
				type: 'boolean',
				default: true,
				description: 'Whether to include timestamps in the export',
			},
			{
				displayName: 'Merge Same Speaker Segments',
				name: 'mergeSameSpeakerSegments',
				type: 'boolean',
				default: false,
				description: 'Whether to combine consecutive segments from the same speaker',
			},
			{
				displayName: 'Paragraph Size',
				name: 'paragraphSize',
				type: 'options',
				options: [
					{ name: '1 Sentence', value: 1 },
					{ name: '2 Sentences', value: 2 },
					{ name: '4 Sentences', value: 4 },
					{ name: '8 Sentences', value: 8 },
				],
				default: 1,
				description: 'Number of sentences per paragraph',
			},
			{
				displayName: 'Single Paragraph',
				name: 'isSingleParagraph',
				type: 'boolean',
				default: false,
				description: 'Whether to output the entire transcript as a single paragraph',
			},
		],
	},
];
