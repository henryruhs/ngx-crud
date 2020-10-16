/**
 * create the url of the request
 *
 * @since 4.3.0
 *
 * @param apiUrl api url of the service
 * @param endpoint endpoint of the service
 * @param id optional identifier of the record
 *
 * @return url of the request
 */

export function createUrl(apiUrl : string, endpoint : string, id? : number | string) : string
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
