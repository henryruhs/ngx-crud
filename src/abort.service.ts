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
		if (!this.store.get(request.url))
		{
			this.store.set(request.url,
			{
				expiration: this.getExpiration(request),
				signal: new Subject<void>()
			});
		}
		return this.store.get(request.url).signal.asObservable();
	}

	public abort(url : string) : this
	{
		if (this.store.get(url))
		{
			this.store.get(url).signal.next();
			this.store.get(url).signal.complete();
			this.store.delete(url);
		}
		return this;
	}

	public abortAll() : this
	{
		this.store.forEach((value, url) => this.abort(url));
		return this;
	}

	public abortOnExpiration<T>(request : HttpRequest<T>) : this
	{
		setTimeout(() => this.abort(request.url), this.getExpiration(request) - Date.now());
		return this;
	}

	protected getExpiration<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(AbortEnum.expiration));
	}
}
