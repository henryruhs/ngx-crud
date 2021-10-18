import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

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

export interface OptionsWithBody extends Options
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
