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
