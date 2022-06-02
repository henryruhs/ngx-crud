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

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	get<T>(request : HttpRequest<T>) : Observable<boolean>
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
			signal: new Subject<boolean>(),
			timer: context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.abort(request.urlWithParams)) : new Subscription()
		});
		this.store.get(request.urlWithParams).signal.next(true);
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
			this.store.get(urlWithParams).timer.unsubscribe();
			this.store.get(urlWithParams).signal.next(false);
			this.store.delete(urlWithParams);
		}
		return this;
	}

	abortMany(url : string) : this
	{
		this.store.forEach((store, urlWithParams) => urlWithParams.startsWith(url) ? this.abort(urlWithParams) : null);
		return this;
	}

	abortAll() : this
	{
		this.store.forEach((store, urlWithParams) => this.abort(urlWithParams));
		return this;
	}

	observeAll() : Observable<[string, Store]>
	{
		return from(this.store);
	}
}
