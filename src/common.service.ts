import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { OptionInterface } from './option.interface';

@Injectable()
export class CommonService
{
	protected http : HttpClient;
	protected apiUrl : string;
	protected endpoint : string;
	protected options : OptionInterface;

	constructor(protected injector : Injector)
	{
		this.http = injector.get(HttpClient);
		this.init();
	}

	public init() : this
	{
		return this
			.clearOptions()
			.clearHeaders()
			.clearParams()
			.clearReportProgress()
			.clearWithCredentials();
	}

	public getApiUrl() : string
	{
		return this.apiUrl;
	}

	public setApiUrl(apiUrl : string) : this
	{
		this.apiUrl = apiUrl;
		return this;
	}

	public getEndpoint() : string
	{
		return this.endpoint;
	}

	public setEndpoint(endpoint : string) : this
	{
		this.endpoint = endpoint;
		return this;
	}

	public getOptions() : OptionInterface
	{
		return this.options;
	}

	public setOptions(options : OptionInterface) : this
	{
		this.options = options;
		return this;
	}

	public clearOptions() : this
	{
		this.options = {};
		return this;
	}

	public getHeaders() : HttpHeaders
	{
		return this.options.headers;
	}

	public setHeaders(headers : HttpHeaders) : this
	{
		this.options.headers = headers;
		return this;
	}

	public clearHeaders() : this
	{
		this.options.headers = new HttpHeaders();
		return this;
	}

	public getParams() : HttpParams
	{
		return this.options.params;
	}

	public setParams(params : HttpParams) : this
	{
		this.options.params = params;
		return this;
	}

	public clearParams() : this
	{
		this.options.params = new HttpParams();
		return this;
	}

	public getReportProgress() : boolean
	{
		return this.options.reportProgress;
	}

	public setReportProgress(reportProgress : boolean) : this
	{
		this.options.reportProgress = reportProgress;
		return this;
	}

	public clearReportProgress() : this
	{
		this.options.reportProgress = true;
		return this;
	}

	public getWithCredentials() : boolean
	{
		return this.options.withCredentials;
	}

	public setWithCredentials(withCredentials : boolean) : this
	{
		this.options.withCredentials = withCredentials;
		return this;
	}

	public clearWithCredentials() : this
	{
		this.options.withCredentials = true;
		return this;
	}

	public createURL(apiUrl : string, endpoint : string, id? : number | string) : string
	{
		const url =
		[
			apiUrl,
			endpoint,
			id,
		]
		.filter(value => value)
		.join('/')
		.replace(/([^:]\/)\/+/g, '$1');

		return url;
	}
}
