import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheEnum } from './cache.enum';
import { CacheInterface } from './cache.interface';

@Injectable()
export class CacheService
{
	protected store : Map<string, CacheInterface> = new Map();

	public get<T>(request : HttpRequest<T>) : Observable<HttpResponse<T>>
	{
		const cache : CacheInterface = this.store.get(request.urlWithParams);

		return cache && this.isValid(cache.expiration) ? cache.response : null;
	}

	public set<T>(request : HttpRequest<T>, response : Observable<HttpResponse<T>>) : this
	{
		this.store.set(request.urlWithParams,
		{
			expiration: this.getExpiration<T>(request),
			response
		});
		return this;
	}

	public clearInvalid() : this
	{
		this.store.forEach((value, index) => !this.isValid(value.expiration) ? this.store.delete(index) : null);
		return this;
	}

	public clearAll() : this
	{
		this.store.forEach((value, index) => this.store.delete(index));
		return this;
	}

	protected isValid(expiration : number) : boolean
	{
		return expiration > Date.now();
	}

	protected getExpiration<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(CacheEnum.expiration));
	}
}
