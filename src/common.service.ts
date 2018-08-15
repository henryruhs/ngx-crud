import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CommonService
{
	protected apiUrl : string;
	protected endpoint : string;
	protected options :
	{
		headers? : HttpHeaders;
		params? : HttpParams;
		reportProgress? : boolean;
		responseType? : string;
		withCredentials? : boolean;
	} = {};

	getApiUrl() : string
	{
		return this.apiUrl;
	}

	setApiUrl(apiUrl : string)
	{
		this.apiUrl = apiUrl;
	}

	getEndpoint() : string
	{
		return this.endpoint;
	}

	setEndpoint(endpoint : string)
	{
		this.endpoint = endpoint;
	}

	getHeaders() : HttpHeaders
	{
		return this.options.headers;
	}

	setHeaders(headers : HttpHeaders)
	{
		this.options.headers = headers;
	}

	clearHeaders()
	{
		this.options.headers = new HttpHeaders();
	}

	getParams() : HttpParams
	{
		return this.options.params;
	}

	setParams(params : HttpParams)
	{
		this.options.params = params;
	}

	clearParams()
	{
		this.options.params = new HttpParams();
	}

	getReportProgress() : boolean
	{
		return this.options.reportProgress;
	}

	setReportProgress(reportProgress : boolean)
	{
		this.options.reportProgress = reportProgress;
	}

	clearReportProgress()
	{
		this.options.reportProgress = true;
	}

	getResponseType() : string
	{
		return this.options.responseType;
	}

	setResponseType(responseType : string)
	{
		this.options.responseType = responseType;
	}

	clearResponseType()
	{
		this.options.responseType = 'json';
	}

	getWithCredentials() : boolean
	{
		return this.options.withCredentials;
	}

	setWithCredentials(withCredentials : boolean)
	{
		this.options.withCredentials = withCredentials;
	}

	clearWithCredentials()
	{
		this.options.withCredentials = true;
	}

	clear()
	{
		this.clearHeaders();
		this.clearParams();
		this.clearReportProgress();
		this.clearResponseType();
		this.clearWithCredentials();
	}
}