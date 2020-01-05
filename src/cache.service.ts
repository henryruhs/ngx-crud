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
		if (!this.has(request))
		{
			return Observable.create(observer => observer.error());
		}
		return this.store.get(request.urlWithParams).response;
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

	public has<T>(request : HttpRequest<T>) : boolean
	{
		const cache : CacheInterface = this.store.get(request.urlWithParams);

		return cache && this.isValid(cache.expiration);
	}

	public flush(urlWithParams : string) : this
	{
		this.store.delete(urlWithParams);
		return this;
	}

	public flushMany(baseUrl : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(baseUrl) ? this.flush(urlWithParams) : null);
		return this;
	}

	public flushAll() : this
	{
		this.store.forEach((value, urlWithParams) => this.flush(urlWithParams));
		return this;
	}

	public flushOnExpiration<T>(request : HttpRequest<T>) : this
	{
		setTimeout(() => this.flush(request.urlWithParams), this.getExpiration(request) - Date.now());
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
