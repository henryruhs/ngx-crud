import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheEnum } from './cache.enum';
import { CacheInterface } from './cache.interface';

@Injectable()
export class CacheService
{
	protected store : Map<string, CacheInterface> = new Map();

	/**
	 * get the response of the request
	 *
	 * @since 3.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return http response as observable
	 */

	public get<T>(request : HttpRequest<T>) : Observable<HttpResponse<T>>
	{
		if (!this.has(request))
		{
			return new Observable(observer => observer.error());
		}
		return this.store.get(request.urlWithParams).response;
	}

	/**
	 * set the response and timeout for the request
	 *
	 * @since 3.0.0
	 *
	 * @param request instance of the http request
	 * @param response instance of the http response
	 *
	 * @return instance of the service
	 */

	public set<T>(request : HttpRequest<T>, response : Observable<HttpResponse<T>>) : this
	{
		const lifetime : number = this.getLifetime(request);

		if (this.has(request))
		{
			clearTimeout(this.store.get(request.urlWithParams).timeout);
		}
		this.store.set(request.urlWithParams,
		{
			response,
			timeout: lifetime > 0 ? setTimeout(() => this.flush(request.urlWithParams), lifetime) : null
		});
		return this;
	}

	/**
	 * has a response and timeout for the request
	 *
	 * @since 3.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return boolean
	 */

	public has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	/**
	 * flush a single cache for enabled services:
	 *
	 * @since 3.0.0
	 *
	 * @param urlWithParams url with parameters
	 *
	 * @return instance of the service
	 */

	public flush(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			clearTimeout(this.store.get(urlWithParams).timeout);
			this.store.delete(urlWithParams);
		}
		return this;
	}

	/**
	 * flush many caches for enabled services:
	 *
	 * @since 4.1.0
	 *
	 * @param endpointUrl endpoint url of the request
	 *
	 * @return instance of the service
	 */

	public flushMany(endpointUrl : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(endpointUrl) ? this.flush(urlWithParams) : null);
		return this;
	}

	/**
	 * flush all caches for enabled services:
	 *
	 * @since 3.0.0
	 *
	 * @return instance of the service
	 */

	public flushAll() : this
	{
		this.store.forEach((value, urlWithParams) => this.flush(urlWithParams));
		return this;
	}

	/**
	 * get the lifetime of the request
	 *
	 * @since 3.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return lifetime of the request
	 */

	protected getLifetime<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(CacheEnum.lifetime));
	}
}
