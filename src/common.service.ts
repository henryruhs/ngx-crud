import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { CacheEnum } from './cache.enum';
import { MethodType } from './method.type';
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
			.clearParams();
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

	public getOption<K extends keyof OptionInterface>(name: K) : OptionInterface[K]
	{
		return this.options[name];
	}

	public setOptions(options : OptionInterface) : this
	{
		this.options = options;
		return this;
	}

	public setOption<K extends keyof OptionInterface>(name: K, value: OptionInterface[K]) : this
	{
		this.options[name.toString()] = value;
		return this;
	}

	public clearOptions() : this
	{
		this.setOptions(
		{
			reportProgress: true,
			withCredentials: true
		});
		return this;
	}

	public clearOption(name: keyof OptionInterface) : this
	{
		this.setOption(name, null);
		return this;
	}

	public getHeaders() : HttpHeaders
	{
		return this.getOption('headers');
	}

	public getHeaderArray(name: string) : string[]
	{
		return this.getHeaders().getAll(name);
	}

	public getHeader(name: string) : string
	{
		return this.getHeaders().get(name);
	}

	public setHeaders(headers : HttpHeaders) : this
	{
		return this.setOption('headers', headers);
	}

	public setHeaderArray(name: string, valueArray: string[]) : this
	{
		return this.setHeaders(this.getHeaders().set(name, valueArray));
	}

	public setHeader(name: string, value: string) : this
	{
		return this.setHeaders(this.getHeaders().set(name, value));
	}

	public appendHeader(name: string, value: string) : this
	{
		return this.setHeaders(this.getHeaders().append(name, value));
	}

	public clearHeaders() : this
	{
		return this.setHeaders(new HttpHeaders());
	}

	public clearHeader(name: string) : this
	{
		return this.setHeaders(this.getHeaders().delete(name));
	}

	public getParams() : HttpParams
	{
		return this.getOption('params');
	}

	public getParamArray(name: string) : string[]
	{
		return this.getParams().getAll(name);
	}

	public getParam(name: string) : string
	{
		return this.getParams().get(name);
	}

	public setParams(params : HttpParams) : this
	{
		return this.setOption('params', params);
	}

	public setParamArray(name: string, valueArray: string[]) : this
	{
		this.clearParam(name);
		valueArray.forEach(value => this.appendParam(name, value));
		return this;
	}

	public setParam(name: string, value: string) : this
	{
		return this.setParams(this.getParams().set(name, value));
	}

	public appendParam(name: string, value: string) : this
	{
		return this.setParams(this.getParams().append(name, value));
	}

	public clearParams() : this
	{
		return this.setParams(new HttpParams());
	}

	public clearParam(name: string) : this
	{
		return this.setParams(this.getParams().delete(name));
	}

	public doCache(method: MethodType = 'GET', lifetime: number = 1000) : this
	{
		return this
			.setHeader(CacheEnum.cacheMethod, method)
			.setHeader(CacheEnum.cacheExpiration, (Date.now() + lifetime).toString());
	}

	public noCache() : this
	{
		return this
			.clearHeader(CacheEnum.cacheMethod)
			.clearHeader(CacheEnum.cacheExpiration);
	}

	public createURL(apiUrl : string, endpoint : string, id? : number | string) : string
	{
		const route : string =
		[
			endpoint,
			id
		]
		.filter(value => value)
		.join('/');

		return apiUrl + route;
	}
}
