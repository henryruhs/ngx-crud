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
			return new Observable(observer => observer.error());
		}
		return this.store.get(request.urlWithParams).response;
	}

	public set<T>(request : HttpRequest<T>, response : Observable<HttpResponse<T>>) : this
	{
		if (this.has(request))
		{
			clearTimeout(this.store.get(request.urlWithParams).timeout);
		}
		this.store.set(request.urlWithParams,
		{
			response,
			timeout: setTimeout(() => this.flush(request.urlWithParams), this.getLifetime(request))
		});
		return this;
	}

	public has<T>(request : HttpRequest<T>) : boolean
	{
		return this.store.has(request.urlWithParams);
	}

	public flush(urlWithParams : string) : this
	{
		if (this.store.has(urlWithParams))
		{
			clearTimeout(this.store.get(urlWithParams).timeout);
			this.store.delete(urlWithParams);
		}
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

	protected getLifetime<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(CacheEnum.lifetime));
	}
}
