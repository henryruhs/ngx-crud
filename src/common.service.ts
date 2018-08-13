import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CommonService
{
	protected apiUrl : string;
	protected endpoint : string;
	protected options =
	{
		headers: new HttpHeaders(),
		params: new HttpParams(),
		reportProgress: true,
		responseType: 'json',
		withCredentials: true
	};

	constructor(protected http : HttpClient)
	{
	}

	getHeaders() : HttpHeaders
	{
		return this.options.headers;
	}

	setHeaders(headers : HttpHeaders)
	{
		this.options.headers = headers;
	}

	getParams() : HttpParams
	{
		return this.options.params;
	}

	setParams(params : HttpParams)
	{
		this.options.params = params;
	}

	getReportProgress() : boolean
	{
		return this.options.reportProgress;
	}

	setReportProgress(reportProgress : boolean)
	{
		this.options.reportProgress = reportProgress;
	}

	getResponseType() : string
	{
		return this.options.responseType;
	}

	setResponseType(responseType : string)
	{
		this.options.responseType = responseType;
	}

	getWithCredentials() : boolean
	{
		return this.options.withCredentials;
	}

	setWithCredentials(withCredentials : boolean)
	{
		this.options.withCredentials = withCredentials;
	}
}