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

	public getHeaderArray(name: string) : string[]
	{
		return this.options.headers.getAll(name);
	}

	public getHeader(name: string) : string
	{
		return this.options.headers.get(name);
	}

	public setHeaders(headers : HttpHeaders) : this
	{
		this.options.headers = headers;
		return this;
	}

	public setHeader(name: string, value: string) : this
	{
		this.options.headers = this.options.headers.set(name, value);
		return this;
	}

	public appendHeader(name: string, value: string) : this
	{
		this.options.headers = this.options.headers.append(name, value);
		return this;
	}

	public clearHeaders() : this
	{
		this.options.headers = new HttpHeaders();
		return this;
	}

	public clearHeader(name: string) : this
	{
		this.options.headers = this.options.headers.delete(name);
		return this;
	}

	public getParams() : HttpParams
	{
		return this.options.params;
	}

	public getParamArray(name: string) : string[]
	{
		return this.options.params.getAll(name);
	}

	public getParam(name: string) : string
	{
		return this.options.params.get(name);
	}

	public setParams(params : HttpParams) : this
	{
		this.options.params = params;
		return this;
	}

	public setParam(name: string, value: string) : this
	{
		this.options.params = this.options.params.set(name, value);
		return this;
	}

	public appendParam(name: string, value: string) : this
	{
		this.options.params = this.options.params.append(name, value);
		return this;
	}

	public clearParams() : this
	{
		this.options.params = new HttpParams();
		return this;
	}

	public clearParam(name: string) : this
	{
		this.options.params = this.options.params.delete(name);
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
		const url : string =
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
}
