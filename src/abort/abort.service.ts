import { HttpContextToken, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, timer, Observable, Subject, Subscription } from 'rxjs';
import { Context, Store } from './abort.interface';

@Injectable()
export class AbortService
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

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	/**
	 * get the signal of the request
	 *
	 * @since 4.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {Observable<boolean>} signal of the request
	 */

	get<T>(request : HttpRequest<T>) : Observable<boolean>
	{
		if (!this.has(request))
		{
			this.set(request);
		}
		return this.store.get(request.urlWithParams).signal;
	}

	/**
	 * set the signal and timer for the request
	 *
	 * @since 4.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {this} instance of the service
	 */

	set<T>(request : HttpRequest<T>) : this
	{
		const context : Context = request.context.get(this.getToken());

		if (this.has(request))
		{
			this.store.get(request.urlWithParams).timer.unsubscribe();
		}
		this.store.set(request.urlWithParams,
		{
			signal: new Subject<boolean>(),
			timer: context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.abort(request.urlWithParams)) : new Subscription()
		});
		this.store.get(request.urlWithParams).signal.next(true);
		return this;
	}

	/**
	 * has a signal and timer for the request
	 *
	 * @since 4.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {boolean}
	 */

	has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	/**
	 * abort a single request for enabled services
	 *
	 * @since 4.0.0
	 *
	 * @param {string} urlWithParams url with parameters
	 *
	 * @return {this} instance of the service
	 */

	abort(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			this.store.get(urlWithParams).timer.unsubscribe();
			this.store.get(urlWithParams).signal.next(false);
			this.store.delete(urlWithParams);
		}
		return this;
	}

	/**
	 * abort many requests for enabled services
	 *
	 * @since 4.1.0
	 *
	 * @param {string} url url of the request
	 *
	 * @return {this} instance of the service
	 */

	abortMany(url : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(url) ? this.abort(urlWithParams) : null);
		return this;
	}

	/**
	 * abort all requests for enabled services
	 *
	 * @since 4.0.0
	 *
	 * @return {this} instance of the service
	 */

	abortAll() : this
	{
		this.store.forEach((value, urlWithParams) => this.abort(urlWithParams));
		return this;
	}

	/**
	 * observe all requests for enabled services
	 *
	 * @since 4.1.0
	 *
	 * @return {Observable<[string, Store]>} collection of signal and timer
	 */

	observeAll() : Observable<[string, Store]>
	{
		return from(this.store);
	}
}
