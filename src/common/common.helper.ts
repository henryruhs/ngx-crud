import { Id } from './common.type';

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

export function stripUrlParams(urlWithParams : string) : string
{
	return urlWithParams?.split('?').at(0);
}
