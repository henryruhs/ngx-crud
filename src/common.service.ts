import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AbortEnum } from './abort.enum';
import { AbortService } from './abort.service';
import { CacheEnum } from './cache.enum';
import { CacheService } from './cache.service';
import { createUrl } from './helper';
import { MethodType } from './method.type';
import { OptionInterface } from './option.interface';

@Injectable()
export class CommonService
{
	protected http : HttpClient;
	protected abortService : AbortService;
	protected cacheService : CacheService;
	protected apiUrl : string;
	protected endpoint : string;
	protected options : OptionInterface;

	constructor(protected injector : Injector)
	{
		this.http = injector.get(HttpClient);
		this.abortService = injector.get(AbortService);
		this.cacheService = injector.get(CacheService);
		this.init();
	}

	public init() : this
	{
		return this.clear();
	}

	public clear() : this
	{
		return this
			.clearOptions()
			.clearHeaders()
			.clearParams();
	}

	public abort() : this
	{
		const baseURL : string = createUrl(this.getApiUrl(), this.getEndpoint());

		this.abortService.abortMany(baseURL);
		return this;
	}

	public flush() : this
	{
		const baseURL : string = createUrl(this.getApiUrl(), this.getEndpoint());

		this.cacheService.flushMany(baseURL);
		return this;
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

	public getOption<K extends keyof OptionInterface>(name : K) : OptionInterface[K]
	{
		return this.options[name];
	}

	public setOptions(options : OptionInterface) : this
	{
		this.options = options;
		return this;
	}

	public setOption<K extends keyof OptionInterface>(name : K, value : OptionInterface[K]) : this
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

	public clearOption(name : keyof OptionInterface) : this
	{
		this.setOption(name, null);
		return this;
	}

	public getHeaders() : HttpHeaders
	{
		return this.getOption('headers');
	}

	public getHeaderArray(name : string) : string[]
	{
		return this.getHeaders().getAll(name);
	}

	public getHeader(name : string) : string
	{
		return this.getHeaders().get(name);
	}

	public setHeaders(headers : HttpHeaders) : this
	{
		return this.setOption('headers', headers);
	}

	public setHeaderArray(name : string, valueArray : string[]) : this
	{
		return this.setHeaders(this.getHeaders().set(name, valueArray));
	}

	public setHeader(name : string, value : string) : this
	{
		return this.setHeaders(this.getHeaders().set(name, value));
	}

	public appendHeader(name : string, value : string) : this
	{
		return this.setHeaders(this.getHeaders().append(name, value));
	}

	public clearHeaders() : this
	{
		return this.setHeaders(new HttpHeaders());
	}

	public clearHeader(name : string) : this
	{
		return this.setHeaders(this.getHeaders().delete(name));
	}

	public getParams() : HttpParams
	{
		return this.getOption('params');
	}

	public getParamArray(name : string) : string[]
	{
		return this.getParams().getAll(name);
	}

	public getParam(name : string) : string
	{
		return this.getParams().get(name);
	}

	public setParams(params : HttpParams) : this
	{
		return this.setOption('params', params);
	}

	public setParamArray(name : string, valueArray : string[]) : this
	{
		this.clearParam(name);
		valueArray.forEach(value => this.appendParam(name, value));
		return this;
	}

	public setParam(name : string, value : string) : this
	{
		return this.setParams(this.getParams().set(name, value));
	}

	public appendParam(name : string, value : string) : this
	{
		return this.setParams(this.getParams().append(name, value));
	}

	public clearParams() : this
	{
		return this.setParams(new HttpParams());
	}

	public clearParam(name : string) : this
	{
		return this.setParams(this.getParams().delete(name));
	}

	public enableAbort(method : MethodType = 'GET', lifetime : number = 2000) : this
	{
		return this
			.setHeader(AbortEnum.method, method)
			.setHeader(AbortEnum.lifetime, lifetime.toString());
	}

	public disableAbort() : this
	{
		return this
			.clearHeader(AbortEnum.method)
			.clearHeader(AbortEnum.lifetime);
	}

	public enableCache(method : MethodType = 'GET', lifetime : number = 2000) : this
	{
		return this
			.setHeader(CacheEnum.method, method)
			.setHeader(CacheEnum.lifetime, lifetime.toString());
	}

	public disableCache() : this
	{
		return this
			.clearHeader(CacheEnum.method)
			.clearHeader(CacheEnum.lifetime);
	}
}
