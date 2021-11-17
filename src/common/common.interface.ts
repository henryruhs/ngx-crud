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

export interface OptionsWithBody<ResponseBody> extends Options
{
	body ?: ResponseBody;
}

export interface Context
{
	[index : string] : any;
}
