import { HttpContextToken, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, filter, from, timer, mergeMap } from 'rxjs';
import { ReactiveMap } from 'rxjs-collection';
import { Context, Store } from './abort.interface';
import { AbortSignal } from './abort.type';
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
	protected store : ReactiveMap<string, Store> = new ReactiveMap<string, Store>();

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	get<T>(request : HttpRequest<T>) : Observable<AbortSignal>
	{
		if (!this.has(request))
		{
			this.set(request);
		}
		return this.store.get(request.urlWithParams).signal;
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
			signal: new BehaviorSubject<AbortSignal>('STARTED'),
			timer: context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.abort(request.urlWithParams)) : new Subscription()
		});
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
			this.store.get(urlWithParams).signal.next('ABORTED');
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
		return this.observeAll().pipe(filter(([ value ] : [ string, Store ]) => value === urlWithParams));
	}

	observeMany(url : string) : Observable<[string, Store]>
	{
		return this.observeAll().pipe(filter(([ value ] : [ string, Store ]) => stripUrlParams(value) === url));
	}

	observeAll() : Observable<[string, Store]>
	{
		return this.store.asObservable().pipe(mergeMap(value => from(value)));
	}
}
