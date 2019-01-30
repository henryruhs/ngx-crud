import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface OptionInterface
{
	headers? : HttpHeaders;
	params? : HttpParams;
	reportProgress? : boolean;
	responseType? : 'json';
	withCredentials? : boolean;
}

export interface OptionWithBodyInterface extends OptionInterface
{
	body? : any;
}
