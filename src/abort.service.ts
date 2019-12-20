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
		this.store.get(request.url).next();
		this.store.get(request.url).complete();
		return this;
	}

	public destroy() : this
	{
		this.store.forEach((value, index) => this.store.delete(index));
		return this;
	}
}
