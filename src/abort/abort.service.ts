import { HttpContextToken, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, filter, from, timer } from 'rxjs';
import { Context, Store } from './abort.interface';
import { stripUrlParams } from '../common';

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

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	get<T>(request : HttpRequest<T>) : Observable<AbortController>
	{
		if (!this.has(request))
		{
			this.set(request);
		}
		return this.store.get(request.urlWithParams).controller;
	}

	set<T>(request : HttpRequest<T>) : this
	{
		const context : Context = request.context.get(this.getToken());

		if (this.has(request))
		{
			this.store.get(request.urlWithParams).timer.unsubscribe();
		}
		this.store.set(request.urlWithParams,
		{
			controller: new Subject<AbortController>(),
			timer: context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.abort(request.urlWithParams)) : new Subscription()
		});
		this.store.get(request.urlWithParams).controller.next(new AbortController());
		return this;
	}

	has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	abort(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			this.store.get(urlWithParams).controller.subscribe(controller => controller.abort());
			this.store.get(urlWithParams).controller.next(new AbortController());
			this.store.get(urlWithParams).timer.unsubscribe();
			this.store.delete(urlWithParams);
		}
		return this;
	}

	abortMany(url : string) : this
	{
		this.store.forEach((store, urlWithParams) => stripUrlParams(urlWithParams) === url ? this.abort(urlWithParams) : null);
		return this;
	}

	abortAll() : this
	{
		this.store.forEach((store, urlWithParams) => this.abort(urlWithParams));
		return this;
	}

	observe(urlWithParams : string) : Observable<[string, Store]>
	{
		return this.observeAll().pipe(filter(value => value[0] === urlWithParams));
	}

	observeMany(url : string) : Observable<[string, Store]>
	{
		return this.observeAll().pipe(filter(value => stripUrlParams(value[0]) === url));
	}

	observeAll() : Observable<[string, Store]>
	{
		return from(this.store);
	}
}
