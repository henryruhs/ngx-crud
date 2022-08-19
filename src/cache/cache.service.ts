import { HttpContextToken, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, filter, from, timer, mergeMap } from 'rxjs';
import { ReactiveMap } from 'rxjs-collection';
import { Context, Store } from './cache.interface';
import { stripUrlParams } from '../common';

@Injectable()
export class CacheService
{
	protected defaultContext : Context =
	{
		method: null,
		lifetime: null
	};

	protected token : HttpContextToken<Context> = new HttpContextToken<Context>(() => this.defaultContext);
	protected store : ReactiveMap<string, Store> = new ReactiveMap();

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	get<T>(request : HttpRequest<T>) : Observable<HttpResponse<T>>
	{
		if (!this.has(request))
		{
			return new Observable(observer => observer.error());
		}
		return this.store.get(request.urlWithParams).response;
	}

	set<T>(request : HttpRequest<T>, response : Observable<HttpResponse<T>>) : this
	{
		const context : Context = request.context.get(this.getToken());

		if (this.has(request))
		{
			this.store.get(request.urlWithParams).timer.unsubscribe();
		}
		this.store.set(request.urlWithParams,
		{
			response,
			timer: context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.flush(request.urlWithParams)) : new Subscription()
		});
		return this;
	}

	has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	flush(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			this.store.get(urlWithParams).timer.unsubscribe();
			this.store.delete(urlWithParams);
		}
		return this;
	}

	flushMany(url : string) : this
	{
		this.store.forEach((store, urlWithParams) => stripUrlParams(urlWithParams) === url ? this.flush(urlWithParams) : null);
		return this;
	}

	flushAll() : this
	{
		this.store.forEach((store, urlWithParams) => this.flush(urlWithParams));
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
		return this.store.asObservable().pipe(mergeMap(value => from(value)));
	}
}
