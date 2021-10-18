import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

/** @deprecated **/

export interface OptionInterface
{
	context ?: HttpContext;
	headers ?: HttpHeaders;
	params ?: HttpParams;
	observe ?: any;
	reportProgress ?: boolean;
	responseType ?: any;
	withCredentials ?: boolean;
}

/** @deprecated **/

export interface OptionWithBodyInterface extends OptionInterface
{
	body ?: BodyInterface;
}

/** @deprecated **/

export interface BodyInterface
{
	[index : string] : any;
}

/** @deprecated **/

export interface ContextInterface
{
	[index : string] : any;
}

export interface Options
{
	context ?: HttpContext;
	headers ?: HttpHeaders;
	params ?: HttpParams;
	observe ?: any;
	reportProgress ?: boolean;
	responseType ?: any;
	withCredentials ?: boolean;
}

export interface OptionWithBody extends Options
{
	body ?: Body;
}

export interface Body
{
	[index : string] : any;
}

export interface Context
{
	[index : string] : any;
}
