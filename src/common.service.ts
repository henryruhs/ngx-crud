import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { OptionInterface } from './option.interface';

@Injectable()
export class CommonService
{
	protected apiUrl : string;
	protected endpoint : string;
	protected options : OptionInterface;

	getApiUrl() : string
	{
		return this.apiUrl;
	}

	setApiUrl(apiUrl : string) : this
	{
		this.apiUrl = apiUrl;
		return this;
	}

	getEndpoint() : string
	{
		return this.endpoint;
	}

	setEndpoint(endpoint : string) : this
	{
		this.endpoint = endpoint;
		return this;
	}

	getOptions() : OptionInterface
	{
		return this.options;
	}

	setOptions(options : OptionInterface) : this
	{
		this.options = options;
		return this;
	}

	clearOptions() : this
	{
		this.options = {};
		return this;
	}

	getHeaders() : HttpHeaders
	{
		return this.options.headers;
	}

	setHeaders(headers : HttpHeaders) : this
	{
		this.options.headers = headers;
		return this;
	}

	clearHeaders() : this
	{
		this.options.headers = new HttpHeaders();
		return this;
	}

	getParams() : HttpParams
	{
		return this.options.params;
	}

	setParams(params : HttpParams) : this
	{
		this.options.params = params;
		return this;
	}

	clearParams() : this
	{
		this.options.params = new HttpParams();
		return this;
	}

	getReportProgress() : boolean
	{
		return this.options.reportProgress;
	}

	setReportProgress(reportProgress : boolean) : this
	{
		this.options.reportProgress = reportProgress;
		return this;
	}

	clearReportProgress() : this
	{
		this.options.reportProgress = true;
		return this;
	}

	getWithCredentials() : boolean
	{
		return this.options.withCredentials;
	}

	setWithCredentials(withCredentials : boolean) : this
	{
		this.options.withCredentials = withCredentials;
		return this;
	}

	clearWithCredentials() : this
	{
		this.options.withCredentials = true;
		return this;
	}

	createURL(apiUrl : string, endpoint : string, id? : number | string) : string
	{
		const url =
		[
			apiUrl,
			endpoint,
			id
		]
		.filter(value => value)
		.join('/')
		.replace(/([^:]\/)\/+/g, '$1');

		return url;
	}

	clear() : this
	{
		return this
			.clearOptions()
			.clearHeaders()
			.clearParams()
			.clearReportProgress()
			.clearWithCredentials();
	}
}