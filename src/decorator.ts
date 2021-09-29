/**
 * decorator to set the api url of the service
 *
 * @since 7.1.0
 *
 * @param apiUrl api url of the service
 *
 * @return Function
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
 * @param endpoint endpoint of the service
 *
 * @return Function
 */

export function Endpoint(endpoint : string) : Function
{
	return (constructor : Function) =>
	{
		constructor.prototype.setEndpoint(endpoint);
	};
}

