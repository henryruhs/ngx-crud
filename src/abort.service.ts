import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AbortEnum } from './abort.enum';
import { AbortInterface } from './abort.interface';

@Injectable()
export class AbortService
{
	protected store : Map<string, AbortInterface> = new Map();

	public get<T>(request : HttpRequest<T>) : Observable<void>
	{
		if (!this.has(request))
		{
			this.set(request);
		}
		return this.store.get(request.urlWithParams).signal.asObservable();
	}

	public set<T>(request : HttpRequest<T>) : this
	{
		this.store.set(request.urlWithParams,
		{
			expiration: this.getExpiration(request),
			signal: new Subject<void>()
		});
		return this;
	}

	public has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	public abort(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			this.store.get(urlWithParams).signal.next();
			this.store.get(urlWithParams).signal.complete();
			this.store.delete(urlWithParams);
		}
		return this;
	}

	public abortMany(baseUrl : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(baseUrl) ? this.abort(urlWithParams) : null);
		return this;
	}

	public abortAll() : this
	{
		this.store.forEach((value, urlWithParams) => this.abort(urlWithParams));
		return this;
	}

	public abortOnExpiration<T>(request : HttpRequest<T>) : this
	{
		setTimeout(() => this.abort(request.urlWithParams), this.getExpiration(request) - Date.now());
		return this;
	}

	protected getExpiration<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(AbortEnum.expiration));
	}
}
