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
	protected http : HttpClient;
	protected abortService : AbortService;
	protected cacheService : CacheService;
	protected observeService : ObserveService;
	protected apiUrl : string;
	protected apiRoute : string;
	protected options : Options;

	constructor(protected injector : Injector)
	{
		this.http = injector.get<HttpClient>(HttpClient);
		this.abortService = injector.get<AbortService>(AbortService);
		this.cacheService = injector.get<CacheService>(CacheService);
		this.observeService = injector.get<ObserveService>(ObserveService);
		this.init();
	}

	/**
	 * bind the service
	 *
	 * @since 6.2.0
	 *
	 * @param {this} that instance of the service
	 *
	 * @return {this} instance of the service
	 */

	bind(that : this) : this
	{
		return this
			.setApiUrl(that.getApiUrl())
			.setApiRoute(that.getApiRoute())
			.setOptions(that.getOptions());
	}

	/**
	 * clone the service
	 *
	 * @since 10.1.0
	 *
	 * @return {this} instance of the service
	 */

	clone() : this
	{
		return new (this.constructor as new (injector) => this)(this.injector);
	}

	/**
	 * clear the service
	 *
	 * @since 2.0.0
	 *
	 * @return {this} instance of the service
	 */

	clear() : this
	{
		return this
			.clearOptions()
			.clearContext()
			.clearHeaders()
			.clearParams();
	}

	/**
	 * destroy the service
	 *
	 * @since 4.0.0
	 *
	 * @return {this} instance of the service
	 */

	destroy() : this
	{
		return this
			.abort()
			.flush()
			.clear();
	}

	/**
	 * get the api url of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {string} api url of the service
	 */

	getApiUrl() : string
	{
		return this.apiUrl;
	}

	/**
	 * set the api url of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} apiUrl api url of the service
	 *
	 * @return {this} instance of the service
	 */

	setApiUrl(apiUrl : string) : this
	{
		this.apiUrl = apiUrl;
		return this;
	}

	/**
	 * get the api route of the service
	 *
	 * @since 8.2.0
	 *
	 * @return {string} api route of the service
	 */

	getApiRoute() : string
	{
		return this.apiRoute;
	}

	/**
	 * set the api route of the service
	 *
	 * @since 8.2.0
	 *
	 * @param {string} apiRoute api route of the service
	 *
	 * @return {this} instance of the service
	 */

	setApiRoute(apiRoute : string) : this
	{
		this.apiRoute = apiRoute;
		return this;
	}

	/**
	 * get a single option of the service
	 *
	 * @since 7.2.0
	 *
	 * @param {keyof OptionInterface} name name of the option
	 *
	 * @return {OptionInterface[keyof OptionInterface]} value of the option
	 */

	getOption(name : keyof Options) : Options[keyof Options]
	{
		return this.options[name];
	}

	/**
	 * get the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {Options} instance of the options
	 */

	getOptions() : Options
	{
		return this.options;
	}

	/**
	 * set a single option of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {keyof OptionInterface} name name of the option
	 * @param {OptionInterface[keyof OptionInterface]} value value of the option
	 *
	 * @return {this} instance of the service
	 */

	setOption(name : keyof Options, value : Options[keyof Options]) : this
	{
		this.options[name] = value;
		return this;
	}

	/**
	 * set the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {Options} options options of the request
	 *
	 * @return {this} instance of the service
	 */

	setOptions(options : Options) : this
	{
		this.options = options;
		return this;
	}

	/**
	 * clear a single option of the service
	 *
	 * @since 7.2.0
	 *
	 * @param {keyof OptionInterface} name name of the option
	 *
	 * @return {this} instance of the service
	 */

	clearOption(name : keyof Options) : this
	{
		return this.setOption(name, null);
	}

	/**
	 * clear the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {this} instance of the service
	 */

	clearOptions() : this
	{
		return this.setOptions(
		{
			reportProgress: true
		});
	}

	/**
	 * get the context by token
	 *
	 * @since 6.0.0
	 *
	 * @param {HttpContextToken<Context>} token token of the context
	 *
	 * @return {HttpContext} context by token
	 */

	getContextByToken(token : HttpContextToken<Context>) : HttpContext
	{
		return this.getContext().get(token) as HttpContext;
	}

	/**
	 * get the context instance of the service
	 *
	 * @since 6.0.0
	 *
	 * @return {HttpContext} instance of the context
	 */

	getContext() : HttpContext
	{
		return this.getOption('context');
	}

	/**
	 * set the context by token
	 *
	 * @since 6.0.0
	 *
	 * @param {HttpContextToken<Context>} token token of the context
	 * @param {Context} context value of the context
	 *
	 * @return {this} instance of the service
	 */

	setContextByToken(token : HttpContextToken<Context>, context : Context) : this
	{
		return this.setContext(this.getContext().set(token, context));
	}

	/**
	 * set the context instance of the service
	 *
	 * @since 6.0.0
	 *
	 * @param {HttpContext} context instance of the context
	 *
	 * @return {this} instance of the service
	 */

	setContext(context : HttpContext) : this
	{
		this.setOption('context', context);
		return this;
	}

	/**
	 * clear the context by token
	 *
	 * @since 6.0.0
	 *
	 * @param {HttpContextToken<Context>} token token of the context
	 *
	 * @return {this} instance of the service
	 */

	clearContextByToken(token : HttpContextToken<Context>) : this
	{
		return this.setContext(this.getContext().delete(token));
	}

	/**
	 * clear the context instance of the service
	 *
	 * @since 6.0.0
	 *
	 * @return {this} instance of the service
	 */

	clearContext() : this
	{
		return this.setContext(new HttpContext());
	}

	/**
	 * get a single header of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the header
	 *
	 * @return {string} value of the header
	 */

	getHeader(name : string) : string
	{
		return this.getHeaders().get(name);
	}

	/**
	 * get the headers instance of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {HttpHeaders} instance of the headers
	 */

	getHeaders() : HttpHeaders
	{
		return this.getOption('headers');
	}

	/**
	 * get values for a single header of the service
	 *
	 * @since 3.0.0
	 *
	 * @param {string} name name of the header
	 *
	 * @return {string[]} values of the header
	 */

	getHeaderArray(name : string) : string[]
	{
		return this.getHeaders().getAll(name);
	}

	/**
	 * set a single header of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the header
	 * @param {string} value value of the header
	 *
	 * @return {this} instance of the service
	 */

	setHeader(name : string, value : string) : this
	{
		return this.setHeaders(this.getHeaders().set(name, value));
	}

	/**
	 * set the headers instance of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {HttpHeaders} headers instance of the headers
	 *
	 * @return {this} instance of the service
	 */

	setHeaders(headers : HttpHeaders) : this
	{
		return this.setOption('headers', headers);
	}

	/**
	 * set values for a single header of the service
	 *
	 * @since 3.0.0
	 *
	 * @param {string} name name of the header
	 * @param {string[]} valueArray values of the header
	 *
	 * @return {this} instance of the service
	 */

	setHeaderArray(name : string, valueArray : string[]) : this
	{
		return this.setHeaders(this.getHeaders().set(name, valueArray));
	}

	/**
	 * append a single header to the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the header
	 * @param {string} value value of the header
	 *
	 * @return {this} instance of the service
	 */

	appendHeader(name : string, value : string) : this
	{
		return this.setHeaders(this.getHeaders().append(name, value));
	}

	/**
	 * append values to a single header of the service
	 *
	 * @since 4.0.0
	 *
	 * @param {string} name name of the header
	 * @param {string[]} valueArray values of the header
	 *
	 * @return {this} instance of the service
	 */

	appendHeaderArray(name : string, valueArray : string[]) : this
	{
		return this.setHeaders(this.getHeaders().append(name, valueArray));
	}

	/**
	 * clear a single header of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the header
	 *
	 * @return {this} instance of the service
	 */

	clearHeader(name : string) : this
	{
		return this.setHeaders(this.getHeaders().delete(name));
	}

	/**
	 * clear the headers instance of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {this} instance of the service
	 */

	clearHeaders() : this
	{
		return this.setHeaders(new HttpHeaders());
	}

	/**
	 * get a single parameter of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the parameter
	 *
	 * @return {string} value of the parameter
	 */

	getParam(name : string) : string
	{
		return this.getParams().get(name);
	}

	/**
	 * get the parameters instance of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {HttpParams} instance of the parameters
	 */

	getParams() : HttpParams
	{
		return this.getOption('params');
	}

	/**
	 * get values for a single parameter of the service
	 *
	 * @since 3.0.0
	 *
	 * @param {string} name name of the parameter
	 *
	 * @return {string[]} values of the parameter
	 */

	getParamArray(name : string) : string[]
	{
		return this.getParams().getAll(name);
	}

	/**
	 * set a single parameter of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the parameter
	 * @param {string} value value of the parameter
	 *
	 * @return {this} instance of the service
	 */

	setParam(name : string, value : string) : this
	{
		return this.setParams(this.getParams().set(name, value));
	}

	/**
	 * set the parameters instance of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {HttpParams} params instance of the parameters
	 *
	 * @return {this} instance of the service
	 */

	setParams(params : HttpParams) : this
	{
		return this.setOption('params', params);
	}

	/**
	 * set values for a single parameter of the service
	 *
	 * @since 3.0.0
	 *
	 * @param {string} name name of the parameter
	 * @param {string[]} valueArray values of the parameter
	 *
	 * @return {this} instance of the service
	 */

	setParamArray(name : string, valueArray : string[]) : this
	{
		this.clearParam(name);
		valueArray.forEach(value => this.appendParam(name, value));
		return this;
	}

	/**
	 * append a single parameter to the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the parameter
	 * @param {string} value value of the parameter
	 *
	 * @return {this} instance of the service
	 */

	appendParam(name : string, value : string) : this
	{
		return this.setParams(this.getParams().append(name, value));
	}

	/**
	 * append values to a single parameter of the service
	 *
	 * @since 4.0.0
	 *
	 * @param {string} name name of the parameter
	 * @param {string[]} valueArray values of the parameter
	 *
	 * @return {this} instance of the service
	 */

	appendParamArray(name : string, valueArray : string[]) : this
	{
		valueArray.forEach(value => this.appendParam(name, value));
		return this;
	}

	/**
	 * clear a single parameter of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} name name of the parameter
	 *
	 * @return {this} instance of the service
	 */

	clearParam(name : string) : this
	{
		return this.setParams(this.getParams().delete(name));
	}

	/**
	 * clear the parameters instance of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {this} instance of the service
	 */

	clearParams() : this
	{
		return this.setParams(new HttpParams());
	}

	/**
	 * enable aborting for the service
	 *
	 * @since 4.0.0
	 *
	 * @param {UniversalMethod} method method of the request
	 * @param {number} lifetime lifetime of the request
	 *
	 * @return {this} instance of the service
	 */

	enableAbort(method : UniversalMethod = 'GET', lifetime : number = 2000) : this
	{
		return this.setContextByToken(this.abortService.getToken(),
		{
			method,
			lifetime
		});
	}

	/**
	 * disable aborting for the service
	 *
	 * @since 4.0.0
	 *
	 * @return {this} instance of the service
	 */

	disableAbort() : this
	{
		return this.clearContextByToken(this.abortService.getToken());
	}

	/**
	 * abort all requests of the service
	 *
	 * @since 4.1.0
	 *
	 * @return {this} instance of the service
	 */

	abort() : this
	{
		const url : string = createUrl(this.getApiUrl(), this.getApiRoute());

		this.abortService.abortMany(url);
		return this;
	}

	/**
	 * enable caching for the service
	 *
	 * @since 3.0.0
	 *
	 * @param {UniversalMethod} method method of the request
	 * @param {number} lifetime lifetime of the request
	 *
	 * @return {this} instance of the service
	 */

	enableCache(method : UniversalMethod = 'GET', lifetime : number = 2000) : this
	{
		return this.setContextByToken(this.cacheService.getToken(),
		{
			method,
			lifetime
		});
	}

	/**
	 * disable caching for the service
	 *
	 * @since 3.0.0
	 *
	 * @return {this} instance of the service
	 */

	disableCache() : this
	{
		return this.clearContextByToken(this.cacheService.getToken());
	}

	/**
	 * flush all caches of the service
	 *
	 * @since 4.1.0
	 *
	 * @return {this} instance of the service
	 */

	flush() : this
	{
		const url : string = createUrl(this.getApiUrl(), this.getApiRoute());

		this.cacheService.flushMany(url);
		return this;
	}

	/**
	 * enable observing for the service
	 *
	 * @since 5.0.0
	 *
	 * @param {UniversalMethod} method method of the request
	 * @param {number} lifetime lifetime of the request
	 *
	 * @return {this} instance of the service
	 */

	enableObserve(method : UniversalMethod = 'ANY', lifetime : number = 1000) : this
	{
		return this.setContextByToken(this.observeService.getToken(),
		{
			method,
			lifetime
		});
	}

	/**
	 * disable observing for the service
	 *
	 * @since 5.0.0
	 *
	 * @return {this} instance of the service
	 */

	disableObserve() : this
	{
		return this.clearContextByToken(this.observeService.getToken());
	}

	/**
	 * get the http client
	 *
	 * @since 5.0.0
	 *
	 * @return {HttpClient} instance of the http client
	 */

	getHttpClient() : HttpClient
	{
		return this.http;
	}

	/**
	 * init the service
	 *
	 * @since 4.0.0
	 *
	 * @return {this} instance of the service
	 */

	protected init() : this
	{
		return this.clear();
	}
}
