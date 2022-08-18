import { HttpContextToken, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Optional, Inject, Injectable } from '@angular/core';
import { Observable, Subject, Subscription, filter, from, timer, mergeMap } from 'rxjs';
import { ObserveAfterEffect, ObserveBeforeEffect, Context, Store } from './observe.interface';
import { OBSERVE_EFFECT } from './observe.token';
import { ObserveStatus } from './observe.type';
import { stripUrlParams } from '../common';

@Injectable()
export class ObserveService
{
	protected defaultContext : Context =
	{
		method: null,
		lifetime: null
	};

	protected token : HttpContextToken<Context> = new HttpContextToken<Context>(() => this.defaultContext);
	protected store : Map<string, Store> = new Map();

	constructor(@Optional() @Inject(OBSERVE_EFFECT) protected observeEffect : ObserveBeforeEffect | ObserveAfterEffect)
	{
	}

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	start<T>(request : HttpRequest<T>) : this
	{
		const context : Context = request.context.get(this.getToken());

		if (this.has(request))
		{
			this.store.get(request.urlWithParams).timer.unsubscribe();
		}
		this.store.set(request.urlWithParams,
		{
			status: new Subject<ObserveStatus>(),
			timer: context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.complete(request.urlWithParams)) : new Subscription()
		});
		this.store.get(request.urlWithParams).status.next('STARTED');
		return this;
	}

	before<T>(request : HttpRequest<T>) : HttpRequest<T>
	{
		if (this.observeEffect && 'before' in this.observeEffect)
		{
			return this.observeEffect.before(request);
		}
		return request;
	}

	after<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : this
	{
		if (this.observeEffect && 'after' in this.observeEffect)
		{
			this.observeEffect.after(request, response);
		}
		return this;
	}

	has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	error(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			this.store.get(urlWithParams).status.next('ERRORED');
			this.store.get(urlWithParams).timer.unsubscribe();
		}
		return this;
	}

	complete(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			this.store.get(urlWithParams).status.next('COMPLETED');
			this.store.get(urlWithParams).timer.unsubscribe();
		}
		return this;
	}

	completeMany(url : string) : this
	{
		this.store.forEach((store, urlWithParams) => stripUrlParams(urlWithParams) === url ? this.complete(urlWithParams) : null);
		return this;
	}

	completeAll() : this
	{
		this.store.forEach((store, urlWithParams) => this.complete(urlWithParams));
		return this;
	}

	observe(urlWithParams : string) : Observable<ObserveStatus>
	{
		return from(this.store).pipe(
			filter(value => value[0] === urlWithParams),
			mergeMap(value => value[1].status)
		);
	}

	observeMany(url : string) : Observable<ObserveStatus>
	{
		return from(this.store).pipe(
			filter(value => stripUrlParams(value[0]) === url),
			mergeMap(value => value[1].status)
		);
	}

	observeAll() : Observable<ObserveStatus>
	{
		return from(this.store).pipe(mergeMap(value => value[1].status));
	}
}
