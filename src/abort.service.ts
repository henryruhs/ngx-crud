import { HttpContextToken, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { ContextInterface, StoreInterface } from './abort.interface';

@Injectable()
export class AbortService
{
	protected defaultContext : ContextInterface =
	{
		method: null,
		lifetime: null
	};
	protected token : HttpContextToken<ContextInterface> = new HttpContextToken<ContextInterface>(() => this.defaultContext);
	protected store : Map<string, StoreInterface> = new Map();

	/**
	 * get the token of the context
	 *
	 * @since 6.0.0
	 *
	 * @return token of the context
	 */

	public getToken() : HttpContextToken<ContextInterface>
	{
		return this.token;
	}

	/**
	 * get the signal of the request
	 *
	 * @since 4.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return signal as observable
	 */

	public get<T>(request : HttpRequest<T>) : Observable<boolean>
	{
		if (!this.has(request))
		{
			this.set(request);
		}
		return this.store.get(request.urlWithParams).signal;
	}

	/**
	 * set the signal and timeout for the request
	 *
	 * @since 4.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return instance of the service
	 */

	public set<T>(request : HttpRequest<T>) : this
	{
		const context : ContextInterface = request.context.get(this.getToken());

		if (this.has(request))
		{
			clearTimeout(this.store.get(request.urlWithParams).timeout);
		}
		this.store.set(request.urlWithParams,
		{
			signal: new Subject<boolean>(),
			timeout: context.lifetime > 0 ? setTimeout(() => this.abort(request.urlWithParams), context.lifetime) : null
		});
		this.store.get(request.urlWithParams).signal.next(true);
		return this;
	}

	/**
	 * has a signal and timeout for the request
	 *
	 * @since 4.0.0
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
	 * abort a single request for enabled services
	 *
	 * @since 4.0.0
	 *
	 * @param urlWithParams url with parameters
	 *
	 * @return instance of the service
	 */

	public abort(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			clearTimeout(this.store.get(urlWithParams).timeout);
			this.store.get(urlWithParams).signal.next(false);
			this.store.get(urlWithParams).signal.complete();
			this.store.delete(urlWithParams);
		}
		return this;
	}

	/**
	 * abort many requests for enabled services
	 *
	 * @since 4.1.0
	 *
	 * @param url url of the request
	 *
	 * @return instance of the service
	 */

	public abortMany(url : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(url) ? this.abort(urlWithParams) : null);
		return this;
	}

	/**
	 * abort all requests for enabled services
	 *
	 * @since 4.0.0
	 *
	 * @return instance of the service
	 */

	public abortAll() : this
	{
		this.store.forEach((value, urlWithParams) => this.abort(urlWithParams));
		return this;
	}

	/**
	 * observe all requests for enabled services
	 *
	 * @since 4.1.0
	 *
	 * @return collection of signal and timeout as observable
	 */

	public observeAll() : Observable<[string, StoreInterface]>
	{
		return from(this.store);
	}
}
