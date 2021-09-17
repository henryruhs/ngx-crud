import { IdType } from './common.type';

/**
 * create the url
 *
 * @since 4.3.0
 *
 * @param apiUrl api url of the service
 * @param endpoint endpoint of the service
 *
 * @return url of the request
 */

export function createUrl(apiUrl : string, endpoint : string) : string
{
	const route : string =
	[
		endpoint
	]
	.filter(value => value)
	.join('/');

	return apiUrl + route
}

/**
 * create the url with identifier
 *
 * @since 7.0.0
 *
 * @param apiUrl api url of the service
 * @param endpoint endpoint of the service
 * @param id optional identifier of the resource
 *
 * @return url of the request
 */

export function createUrlWithId(apiUrl : string, endpoint : string, id : IdType) : string
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
