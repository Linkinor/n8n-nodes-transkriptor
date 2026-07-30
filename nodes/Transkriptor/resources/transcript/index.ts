import type { INodeProperties } from 'n8n-workflow';
import { transcriptGetManyDescription } from './getAll';
import { transcriptGetDescription } from './get';
import { transcriptExportDescription } from './exportTranscript';

const showOnlyForTranscript = {
	resource: ['transcript'],
};

export const transcriptDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForTranscript },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get a list of transcripts',
				description: 'Retrieve a list of your transcription files',
				routing: {
					request: {
						method: 'GET',
						url: '/developer/files',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a transcript',
				description: 'Retrieve transcription content by order ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/developer/files/{{$parameter.orderId}}/content',
					},
				},
			},
			{
				name: 'Export',
				value: 'export',
				action: 'Export a transcript',
				description: 'Export a transcription in various formats (TXT, SRT, PDF, DOCX)',
				routing: {
					request: {
						method: 'POST',
						url: '=/developer/files/{{$parameter.orderId}}/content/export',
					},
				},
			},
		],
		default: 'getAll',
	},
	...transcriptGetManyDescription,
	...transcriptGetDescription,
	...transcriptExportDescription,
];
