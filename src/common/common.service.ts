import { HttpClient, HttpContext, HttpContextToken, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { AbortService } from '../abort';
import { CacheService } from '../cache';
import { ObserveService } from '../observe';

import { Context, Options } from './common.interface';
import { UniversalMethod } from './common.type';
import { createUrl } from './common.helper';

@Injectable()
export class CommonService
{
	protected httpClient : HttpClient = this.injector.get(HttpClient);
	protected abortService : AbortService = this.injector.get(AbortService);
	protected cacheService : CacheService = this.injector.get(CacheService);
	protected observeService : ObserveService = this.injector.get(ObserveService);
	protected apiUrl : string;
	protected apiRoute : string;
	protected options : Options;

	constructor(protected injector : Injector)
	{
		this.init();
	}

	bind(that : CommonService) : this
	{
		return this
			.setApiUrl(that.getApiUrl())
			.setApiRoute(that.getApiRoute())
			.setOptions(that.getOptions());
	}

	clone() : this
	{
		return new (this.constructor as new (injector) => this)(this.injector);
	}

	clear() : this
	{
		return this
			.clearOptions()
			.clearContext()
			.clearHeaders()
			.clearParams();
	}

	destroy() : this
	{
		return this
			.abort()
			.flush()
			.clear();
	}

	getApiUrl() : string
	{
		return this.apiUrl;
	}

	setApiUrl(apiUrl : string) : this
	{
		this.apiUrl = apiUrl;
		return this;
	}

	getApiRoute() : string
	{
		return this.apiRoute;
	}

	setApiRoute(apiRoute : string) : this
	{
		this.apiRoute = apiRoute;
		return this;
	}

	getOption(name : keyof Options) : Options[keyof Options]
	{
		return this.options[name];
	}

	getOptions() : Options
	{
		return this.options;
	}

	setOption(name : keyof Options, value : Options[keyof Options]) : this
	{
		this.options[name] = value;
		return this;
	}

	setOptions(options : Options) : this
	{
		this.options = options;
		return this;
	}

	clearOption(name : keyof Options) : this
	{
		return this.setOption(name, null);
	}

	clearOptions() : this
	{
		return this.setOptions(
		{
			reportProgress: true
		});
	}

	getContextByToken(token : HttpContextToken<Context>) : HttpContext
	{
		return this.getContext().get(token) as HttpContext;
	}

	getContext() : HttpContext
	{
		return this.getOption('context');
	}

	setContextByToken(token : HttpContextToken<Context>, context : Context) : this
	{
		return this.setContext(this.getContext().set(token, context));
	}

	setContext(context : HttpContext) : this
	{
		this.setOption('context', context);
		return this;
	}

	clearContextByToken(token : HttpContextToken<Context>) : this
	{
		return this.setContext(this.getContext().delete(token));
	}

	clearContext() : this
	{
		return this.setContext(new HttpContext());
	}

	getHeader(name : string) : string
	{
		return this.getHeaders().get(name);
	}

	getHeaders() : HttpHeaders
	{
		return this.getOption('headers');
	}

	getHeaderArray(name : string) : string[]
	{
		return this.getHeaders().getAll(name);
	}

	setHeader(name : string, value : string) : this
	{
		return this.setHeaders(this.getHeaders().set(name, value));
	}

	setHeaders(headers : HttpHeaders) : this
	{
		return this.setOption('headers', headers);
	}

	setHeaderArray(name : string, valueArray : string[]) : this
	{
		return this.setHeaders(this.getHeaders().set(name, valueArray));
	}

	appendHeader(name : string, value : string) : this
	{
		return this.setHeaders(this.getHeaders().append(name, value));
	}

	appendHeaderArray(name : string, valueArray : string[]) : this
	{
		return this.setHeaders(this.getHeaders().append(name, valueArray));
	}

	clearHeader(name : string) : this
	{
		return this.setHeaders(this.getHeaders().delete(name));
	}

	clearHeaders() : this
	{
		return this.setHeaders(new HttpHeaders());
	}

	getParam(name : string) : string
	{
		return this.getParams().get(name);
	}

	getParams() : HttpParams
	{
		return this.getOption('params');
	}

	getParamArray(name : string) : string[]
	{
		return this.getParams().getAll(name);
	}

	setParam(name : string, value : string) : this
	{
		return this.setParams(this.getParams().set(name, value));
	}

	setParams(params : HttpParams) : this
	{
		return this.setOption('params', params);
	}

	setParamArray(name : string, valueArray : string[]) : this
	{
		this.clearParam(name);
		valueArray.forEach(value => this.appendParam(name, value));
		return this;
	}

	appendParam(name : string, value : string) : this
	{
		return this.setParams(this.getParams().append(name, value));
	}

	appendParamArray(name : string, valueArray : string[]) : this
	{
		valueArray.forEach(value => this.appendParam(name, value));
		return this;
	}

	clearParam(name : string) : this
	{
		return this.setParams(this.getParams().delete(name));
	}

	clearParams() : this
	{
		return this.setParams(new HttpParams());
	}

	enableAbort(method : UniversalMethod = 'GET', lifetime : number = 2000) : this
	{
		return this.setContextByToken(this.abortService.getToken(),
		{
			method,
			lifetime
		});
	}

	disableAbort() : this
	{
		return this.clearContextByToken(this.abortService.getToken());
	}

	abort() : this
	{
		const url : string = createUrl(this.getApiUrl(), this.getApiRoute());

		this.abortService.abortMany(url);
		return this;
	}

	enableCache(method : UniversalMethod = 'GET', lifetime : number = 2000) : this
	{
		return this.setContextByToken(this.cacheService.getToken(),
		{
			method,
			lifetime
		});
	}

	disableCache() : this
	{
		return this.clearContextByToken(this.cacheService.getToken());
	}

	flush() : this
	{
		const url : string = createUrl(this.getApiUrl(), this.getApiRoute());

		this.cacheService.flushMany(url);
		return this;
	}

	enableObserve(method : UniversalMethod = 'ANY', lifetime : number = 1000) : this
	{
		return this.setContextByToken(this.observeService.getToken(),
		{
			method,
			lifetime
		});
	}

	disableObserve() : this
	{
		return this.clearContextByToken(this.observeService.getToken());
	}

	getHttpClient() : HttpClient
	{
		return this.httpClient;
	}

	protected init() : this
	{
		return this.clear();
	}
}
