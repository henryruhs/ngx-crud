/**
 * create the endpoint url of the request
 *
 * @since 4.1.0
 *
 * @param apiUrl url of the api
 * @param endpoint route of the endpoint
 * @param id optional identifier of the record
 *
 * @return endpoint url of the request
 */

export function createEndpointUrl(apiUrl : string, endpoint : string, id? : number | string) : string
{
	const route : string =
	[
		endpoint,
		id
	]
	.filter(value => value)
	.join('/');

	return apiUrl + route;
}
