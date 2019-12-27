import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AbortService
{
	protected store : Map<string, Subject<void>> = new Map();

	public get<T>(request : HttpRequest<T>) : Observable<void>
	{
		if (!this.store.get(request.url))
		{
			this.store.set(request.url, new Subject<void>());
		}
		return this.store.get(request.url).asObservable();
	}

	public abort<T>(request : HttpRequest<T>) : this
	{
		return this._abort(request.url);
	}

	public abortAll() : this
	{
		this.store.forEach((subject, url) => this._abort(url));
		return this;
	}

	protected _abort(url : string) : this
	{
		if (this.store.get(url))
		{
			this.store.get(url).next();
			this.store.get(url).complete();
			this.store.delete(url);
		}
		return this;
	}
}
