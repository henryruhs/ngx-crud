import { Constructor } from './common.interface';

export function ApiUrl(apiUrl : string) : Function
{
	return (constructor : Constructor) =>
	{
		constructor.prototype.setApiUrl(apiUrl);
	};
}

export function ApiRoute(apiRoute : string) : Function
{
	return (constructor : Constructor) =>
	{
		constructor.prototype.setApiRoute(apiRoute);
	};
}
