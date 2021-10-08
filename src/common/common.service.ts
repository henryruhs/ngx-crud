import { HttpClient, HttpContext, HttpContextToken, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AbortService } from '../abort/abort.service';
import { CacheService } from '../cache/cache.service';
import { ObserveService } from '../observe/observe.service';
import { ContextInterface, OptionInterface } from './common.interface';
import { UniversalMethodType } from './common.type';
import { createUrl } from '../helper';

@Injectable()
export class CommonService
{
	protected http : HttpClient;
	protected abortService : AbortService;
	protected cacheService : CacheService;
	protected observeService : ObserveService;
	protected apiUrl : string;
	protected endpoint : string;
	protected options : OptionInterface;

	constructor(protected injector : Injector)
	{
		this.http = injector.get<HttpClient>(HttpClient);
		this.abortService = injector.get<AbortService>(AbortService);
		this.cacheService = injector.get<CacheService>(CacheService);
		this.observeService = injector.get<ObserveService>(ObserveService);
		this.init();
	}

	/**
	 * bind to service
	 *
	 * @since 6.2.0
	 *
	 * @param {CommonService} that instance of the common service
	 *
	 * @return {this} instance of the service
	 */

	public bind(that : CommonService) : this
	{
		return this
			.setApiUrl(that.getApiUrl())
			.setEndpoint(that.getEndpoint())
			.setOptions(that.getOptions());
	}

	/**
	 * clear the service
	 *
	 * @since 2.0.0
	 *
	 * @return {this} instance of the service
	 */

	public clear() : this
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

	public destroy() : this
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

	public getApiUrl() : string
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

	public setApiUrl(apiUrl : string) : this
	{
		this.apiUrl = apiUrl;
		return this;
	}

	/**
	 * get the endpoint of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {string} endpoint of the service
	 */

	public getEndpoint() : string
	{
		return this.endpoint;
	}

	/**
	 * set the endpoint of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {string} endpoint endpoint of the service
	 *
	 * @return {this} instance of the service
	 */

	public setEndpoint(endpoint : string) : this
	{
		this.endpoint = endpoint;
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

	public getOption(name : keyof OptionInterface) : OptionInterface[keyof OptionInterface]
	{
		return this.options[name];
	}

	/**
	 * get the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @return {OptionInterface} instance of the options
	 */

	public getOptions() : OptionInterface
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

	public setOption(name : keyof OptionInterface, value : OptionInterface[keyof OptionInterface]) : this
	{
		this.options[name.toString()] = value;
		return this;
	}

	/**
	 * set the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {this} instance of the service
	 */

	public setOptions(options : OptionInterface) : this
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

	public clearOption(name : keyof OptionInterface) : this
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

	public clearOptions() : this
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
	 * @param {HttpContextToken<ContextInterface>} token token of the context
	 *
	 * @return {HttpContext} context by token
	 */

	public getContextByToken(token : HttpContextToken<ContextInterface>) : HttpContext
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

	public getContext() : HttpContext
	{
		return this.getOption('context');
	}

	/**
	 * set the context by token
	 *
	 * @since 6.0.0
	 *
	 * @param {HttpContextToken<ContextInterface>} token token of the context
	 * @param {ContextInterface} value value of the context
	 *
	 * @return {this} instance of the service
	 */

	public setContextByToken(token : HttpContextToken<ContextInterface>, value : ContextInterface) : this
	{
		return this.setContext(this.getContext().set(token, value));
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

	public setContext(context : HttpContext) : this
	{
		this.setOption('context', context);
		return this;
	}

	/**
	 * clear the context by token
	 *
	 * @since 6.0.0
	 *
	 * @param {HttpContextToken<ContextInterface>} token token of the context
	 *
	 * @return {this} instance of the service
	 */

	public clearContextByToken(token : HttpContextToken<ContextInterface>) : this
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

	public clearContext() : this
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

	public getHeader(name : string) : string
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

	public getHeaders() : HttpHeaders
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

	public getHeaderArray(name : string) : string[]
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

	public setHeader(name : string, value : string) : this
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

	public setHeaders(headers : HttpHeaders) : this
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

	public setHeaderArray(name : string, valueArray : string[]) : this
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

	public appendHeader(name : string, value : string) : this
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

	public appendHeaderArray(name : string, valueArray : string[]) : this
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

	public clearHeader(name : string) : this
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

	public clearHeaders() : this
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

	public getParam(name : string) : string
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

	public getParams() : HttpParams
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

	public getParamArray(name : string) : string[]
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

	public setParam(name : string, value : string) : this
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

	public setParams(params : HttpParams) : this
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

	public setParamArray(name : string, valueArray : string[]) : this
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

	public appendParam(name : string, value : string) : this
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

	public appendParamArray(name : string, valueArray : string[]) : this
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

	public clearParam(name : string) : this
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

	public clearParams() : this
	{
		return this.setParams(new HttpParams());
	}

	/**
	 * enable aborting for the service
	 *
	 * @since 4.0.0
	 *
	 * @param {UniversalMethodType} method method of the request
	 * @param {number} lifetime lifetime of the request
	 *
	 * @return {this} instance of the service
	 */

	public enableAbort(method : UniversalMethodType = 'GET', lifetime : number = 2000) : this
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

	public disableAbort() : this
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

	public abort() : this
	{
		const url : string = createUrl(this.getApiUrl(), this.getEndpoint());

		this.abortService.abortMany(url);
		return this;
	}

	/**
	 * enable caching for the service
	 *
	 * @since 3.0.0
	 *
	 * @param {UniversalMethodType} method method of the request
	 * @param {number} lifetime lifetime of the request
	 *
	 * @return {this} instance of the service
	 */

	public enableCache(method : UniversalMethodType = 'GET', lifetime : number = 2000) : this
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

	public disableCache() : this
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

	public flush() : this
	{
		const url : string = createUrl(this.getApiUrl(), this.getEndpoint());

		this.cacheService.flushMany(url);
		return this;
	}

	/**
	 * enable observing for the service
	 *
	 * @since 5.0.0
	 *
	 * @param {UniversalMethodType} method method of the request
	 * @param {number} lifetime lifetime of the request
	 *
	 * @return {this} instance of the service
	 */

	public enableObserve(method : UniversalMethodType = 'ANY', lifetime : number = 1000) : this
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

	public disableObserve() : this
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

	public getHttpClient() : HttpClient
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
