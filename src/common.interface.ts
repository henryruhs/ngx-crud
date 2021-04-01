import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface OptionInterface
{
	headers? : HttpHeaders;
	params? : HttpParams;
	context? : HttpContext;
	observe? : any;
	reportProgress? : boolean;
	responseType? : any;
	withCredentials? : boolean;
}

export interface OptionWithBodyInterface extends OptionInterface
{
	body? : BodyInterface;
}

export interface BodyInterface {
	[index : string] : any;
}
