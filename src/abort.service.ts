import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AbortEnum } from './abort.enum';
import { AbortInterface } from './abort.interface';

@Injectable()
export class AbortService
{
	protected store : Map<string, AbortInterface> = new Map();

	/**
	 * get the signal of the request
	 *
	 * @since 4.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return signal as observable
	 */

	public get<T>(request : HttpRequest<T>) : Observable<void>
	{
		if (!this.has(request))
		{
			this.set(request);
		}
		return this.store.get(request.urlWithParams).signal.asObservable();
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
		const lifetime : number = this.getLifetime(request);

		if (this.has(request))
		{
			clearTimeout(this.store.get(request.urlWithParams).timeout);
		}
		this.store.set(request.urlWithParams,
		{
			signal: new Subject<void>(),
			timeout: lifetime > 0 ? setTimeout(() => this.abort(request.urlWithParams), lifetime) : null
		});
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
			this.store.get(urlWithParams).signal.next();
			this.store.get(urlWithParams).signal.complete();
			this.store.delete(urlWithParams);
		}
		return this;
	}

	/**
	 * abort many requests for enabled services
	 *
	 * @since 4.0.0
	 *
	 * @param baseUrl base url without parameters
	 *
	 * @return instance of the service
	 */

	public abortMany(baseUrl : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(baseUrl) ? this.abort(urlWithParams) : null);
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
	 * get the lifetime of the request
	 *
	 * @since 4.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return lifetime of the request
	 */

	protected getLifetime<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(AbortEnum.lifetime));
	}
}
