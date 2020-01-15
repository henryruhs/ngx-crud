/**
 * create the base url
 *
 * @since 7.0.0
 *
 * @param apiUrl url of the api
 * @param endpoint route of the endpoint
 * @param id optional identifier of the record
 *
 * @return base url without parameters
 */

export function createBaseUrl(apiUrl : string, endpoint : string, id? : number | string) : string
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
