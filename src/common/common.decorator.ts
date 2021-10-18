/**
 * decorator to set the api url of the service
 *
 * @since 7.1.0
 *
 * @param {string} apiUrl api url of the service
 *
 * @return {Function} constructor of the class
 */

export function ApiUrl(apiUrl : string) : Function
{
	return (constructor : Function) =>
	{
		constructor.prototype.setApiUrl(apiUrl);
	};
}

/**
 * decorator to set the endpoint of the service
 *
 * @since 7.1.0
 *
 * @deprecated
 *
 * @param {string} endpoint endpoint of the service
 *
 * @return {Function} constructor of the class
 */

export function Endpoint(endpoint : string) : Function
{
	return (constructor : Function) =>
	{
		constructor.prototype.setEndpoint(endpoint);
	};
}

/**
 * decorator to set the api route of the service
 *
 * @since 8.2.0
 *
 * @param {string} apiRoute api route of the service
 *
 * @return {Function} constructor of the class
 */

export function ApiRoute(apiRoute : string) : Function
{
	return (constructor : Function) =>
	{
		constructor.prototype.setApiRoute(apiRoute);
	};
}
