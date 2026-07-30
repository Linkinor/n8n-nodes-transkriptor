import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTranscriptGetMany = {
	operation: ['getAll'],
	resource: ['transcript'],
};

export const transcriptGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: { show: showOnlyForTranscriptGetMany },
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForTranscriptGetMany,
				returnAll: [false],
			},
		},
		typeOptions: { minValue: 1, maxValue: 100 },
		default: 50,
		description: 'Max number of results to return',
	},
];
