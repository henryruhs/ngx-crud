import { IdType } from './common/common.type';

/**
 * create the url
 *
 * @since 4.3.0
 *
 * @param {string} apiUrl api url of the service
 * @param {string} endpoint endpoint of the service
 *
 * @return {string} url of the request
 */

export function createUrl(apiUrl : string, endpoint : string) : string
{
	const route : string =
	[
		endpoint
	]
	.filter(value => value)
	.join('/');

	return apiUrl + route;
}

/**
 * create the url with identifier
 *
 * @since 7.0.0
 *
 * @param {string} apiUrl api url of the service
 * @param {string} endpoint endpoint of the service
 * @param {IdType} id identifier of the resource
 *
 * @return {string} url of the request
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
