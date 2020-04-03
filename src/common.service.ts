import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AbortEnum } from './abort.enum';
import { AbortService } from './abort.service';
import { CacheEnum } from './cache.enum';
import { CacheService } from './cache.service';
import { OptionInterface } from './common.interface';
import { MethodType } from './common.type';
import { createEndpointUrl } from './helper';

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
		this.http = injector.get<HttpClient>(HttpClient);
		this.abortService = injector.get<AbortService>(AbortService);
		this.cacheService = injector.get<CacheService>(CacheService);
		this.init();
	}

	/**
	 * clear the service
	 *
	 * @since 2.0.0
	 *
	 * @return instance of the service
	 */

	public clear() : this
	{
		return this
			.clearOptions()
			.clearHeaders()
			.clearParams();
	}

	/**
	 * destroy the service
	 *
	 * @since 4.0.0
	 *
	 * @return instance of the service
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
	 * @return api url of the service
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
	 * @param apiUrl api url of the service
	 *
	 * @return instance of the service
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
	 * @return endpoint of the service
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
	 * @param endpoint endpoint of the service
	 *
	 * @return instance of the service
	 */

	public setEndpoint(endpoint : string) : this
	{
		this.endpoint = endpoint;
		return this;
	}

	/**
	 * get a single option of the service
	 *
	 * @since 2.0.0
	 *
	 * @param name name of the option
	 *
	 * @return value of the option
	 */

	public getOption<K extends keyof OptionInterface>(name : K) : OptionInterface[K]
	{
		return this.options[name];
	}

	/**
	 * get the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @return instance of the options
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
	 * @param name name of the option
	 * @param value value of the option
	 *
	 * @return instance of the service
	 */

	public setOption<K extends keyof OptionInterface>(name : K, value : OptionInterface[K]) : this
	{
		this.options[name.toString()] = value;
		return this;
	}

	/**
	 * set the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @param options options of the request
	 *
	 * @return instance of the service
	 */

	public setOptions(options : OptionInterface) : this
	{
		this.options = options;
		return this;
	}

	/**
	 * clear a single option of the service
	 *
	 * @since 2.0.0
	 *
	 * @param name name of the option
	 *
	 * @return instance of the service
	 */

	public clearOption<K extends keyof OptionInterface>(name : K) : this
	{
		return this.setOption(name, null);
	}

	/**
	 * clear the options of the service
	 *
	 * @since 2.0.0
	 *
	 * @return instance of the service
	 */

	public clearOptions() : this
	{
		return this.setOptions(
		{
			reportProgress: true
		});
	}

	/**
	 * get a single header of the service
	 *
	 * @since 2.0.0
	 *
	 * @param name name of the header
	 *
	 * @return value of the header
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
	 * @return instance of the headers
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
	 * @param name name of the header
	 *
	 * @return values of the header
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
	 * @param name name of the header
	 * @param value value of the header
	 *
	 * @return instance of the service
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
	 * @param headers instance of the headers
	 *
	 * @return instance of the service
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
	 * @param name name of the header
	 * @param valueArray values of the header
	 *
	 * @return instance of the service
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
	 * @param name name of the header
	 * @param value value of the header
	 *
	 * @return instance of the service
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
	 * @param name name of the header
	 * @param valueArray values of the header
	 *
	 * @return instance of the service
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
	 * @param name name of the header
	 *
	 * @return instance of the service
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
	 * @return instance of the service
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
	 * @param name name of the parameter
	 *
	 * @return value of the parameter
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
	 * @return instance of the parameters
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
	 * @param name name of the parameter
	 *
	 * @return values of the parameter
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
	 * @param name name of the parameter
	 * @param value value of the parameter
	 *
	 * @return instance of the service
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
	 * @param params instance of the parameters
	 *
	 * @return instance of the service
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
	 * @param name name of the parameter
	 * @param valueArray values of the parameter
	 *
	 * @return instance of the service
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
	 * @param name name of the parameter
	 * @param value value of the parameter
	 *
	 * @return instance of the service
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
	 * @param name name of the parameter
	 * @param valueArray values of the parameter
	 *
	 * @return instance of the service
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
	 * @param name name of the parameter
	 *
	 * @return instance of the service
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
	 * @return instance of the service
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
	 * @param method method of the request
	 * @param lifetime lifetime of the request
	 *
	 * @return instance of the service
	 */

	public enableAbort(method : MethodType = 'GET', lifetime : number = 2000) : this
	{
		return this
			.setHeader(AbortEnum.method, method)
			.setHeader(AbortEnum.lifetime, lifetime.toString());
	}

	/**
	 * disable aborting for the service
	 *
	 * @since 4.0.0
	 *
	 * @return instance of the service
	 */

	public disableAbort() : this
	{
		return this
			.clearHeader(AbortEnum.method)
			.clearHeader(AbortEnum.lifetime);
	}

	/**
	 * abort all requests of the service
	 *
	 * @since 4.1.0
	 *
	 * @return instance of the service
	 */

	public abort() : this
	{
		const endpointUrl : string = createEndpointUrl(this.getApiUrl(), this.getEndpoint());

		this.abortService.abortMany(endpointUrl);
		return this;
	}

	/**
	 * enable caching for the service
	 *
	 * @since 3.0.0
	 *
	 * @param method method of the request
	 * @param lifetime lifetime of the request
	 *
	 * @return instance of the service
	 */

	public enableCache(method : MethodType = 'GET', lifetime : number = 2000) : this
	{
		return this
			.setHeader(CacheEnum.method, method)
			.setHeader(CacheEnum.lifetime, lifetime.toString());
	}

	/**
	 * disable caching for the service
	 *
	 * @since 3.0.0
	 *
	 * @return instance of the service
	 */

	public disableCache() : this
	{
		return this
			.clearHeader(CacheEnum.method)
			.clearHeader(CacheEnum.lifetime);
	}

	/**
	 * flush all caches of the service
	 *
	 * @since 4.1.0
	 *
	 * @return instance of the service
	 */

	public flush() : this
	{
		const endpointUrl : string = createEndpointUrl(this.getApiUrl(), this.getEndpoint());

		this.cacheService.flushMany(endpointUrl);
		return this;
	}

	/**
	 * init the service
	 *
	 * @since 4.0.0
	 *
	 * @return instance of the service
	 */

	protected init() : this
	{
		return this.clear();
	}
}
