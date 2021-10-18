import { HttpContextToken, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Context, Store } from './cache.interface';

@Injectable()
export class CacheService
{
	protected defaultContext : Context =
	{
		method: null,
		lifetime: null
	};
	protected token : HttpContextToken<Context> = new HttpContextToken<Context>(() => this.defaultContext);
	protected store : Map<string, Store> = new Map();

	/**
	 * get the token of the context
	 *
	 * @since 6.0.0
	 *
	 * @return {HttpContextToken<Context>} token of the context
	 */

	public getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	/**
	 * get the response of the request
	 *
	 * @since 3.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {Observable<HttpResponse<T>>} http response
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
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {Observable<HttpResponse<T>>} response instance of the http response
	 *
	 * @return {this} instance of the service
	 */

	public set<T>(request : HttpRequest<T>, response : Observable<HttpResponse<T>>) : this
	{
		const context : Context = request.context.get(this.getToken());

		if (this.has(request))
		{
			clearTimeout(this.store.get(request.urlWithParams).timeout);
		}
		this.store.set(request.urlWithParams,
		{
			response,
			timeout: context.lifetime > 0 ? setTimeout(() => this.flush(request.urlWithParams), context.lifetime) : null
		});
		return this;
	}

	/**
	 * has a response and timeout for the request
	 *
	 * @since 3.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {boolean}
	 */

	public has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	/**
	 * flush a single cache for enabled services
	 *
	 * @since 3.0.0
	 *
	 * @param {string} urlWithParams url with parameters
	 *
	 * @return {this} instance of the service
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
	 * flush many caches for enabled services
	 *
	 * @since 4.1.0
	 *
	 * @param {string} url url of the request
	 *
	 * @return {this} instance of the service
	 */

	public flushMany(url : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(url) ? this.flush(urlWithParams) : null);
		return this;
	}

	/**
	 * flush all caches for enabled services
	 *
	 * @since 3.0.0
	 *
	 * @return {this} instance of the service
	 */

	public flushAll() : this
	{
		this.store.forEach((value, urlWithParams) => this.flush(urlWithParams));
		return this;
	}

	/**
	 * observe all caches for enabled services
	 *
	 * @since 4.1.0
	 *
	 * @return {Observable<[string, Store]>} collection of response and timeout
	 */

	public observeAll() : Observable<[string, Store]>
	{
		return from(this.store);
	}
}
