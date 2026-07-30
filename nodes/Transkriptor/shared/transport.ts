import type {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function transkriptorApiRequest(
	this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject | undefined = undefined,
	qs: IDataObject = {},
) {
	const options: IHttpRequestOptions = {
		method,
		url: `https://api.tor.app${resource}`,
		qs,
		json: true,
	};

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	return this.helpers.httpRequestWithAuthentication.call(this, 'transkriptorApi', options);
}
