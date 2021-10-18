import { Id } from './common.type';

/**
 * create the url
 *
 * @since 8.2.0
 *
 * @param {string} apiUrl api url of the service
 * @param {string} apiRoute api route of the service
 *
 * @return {string} url of the request
 */

export function createUrl(apiUrl : string, apiRoute : string) : string
{
	const route : string =
	[
		apiRoute
	]
	.filter(value => value)
	.join('/');

	return apiUrl + route;
}

/**
 * create the url with identifier
 *
 * @since 8.2.0
 *
 * @param {string} apiUrl api url of the service
 * @param {string} apiRoute api route of the service
 * @param {Id} id identifier of the resource
 *
 * @return {string} url of the request
 */

export function createUrlWithId(apiUrl : string, apiRoute : string, id : Id) : string
{
	const route : string =
	[
		apiRoute,
		id
	]
	.filter(value => value)
	.join('/');

	return apiUrl + route;
}
