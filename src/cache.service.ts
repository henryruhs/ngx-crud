import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheEnum } from './cache.enum';
import { CacheInterface } from './cache.interface';

@Injectable()
export class CacheService
{
	protected cache: Map<string, CacheInterface> = new Map();

	public get<T>(request: HttpRequest<T>): Observable<HttpResponse<T>>
	{
		const cache: CacheInterface = this.cache.get(request.urlWithParams);

		return cache && this.isValid(cache.expiration) ? cache.response : null;
	}

	public set<T>(request: HttpRequest<T>, response: Observable<HttpResponse<T>>): this
	{
		this.cache.set(request.urlWithParams,
		{
			expiration: this.getExpiration<T>(request),
			response,
			url: request.urlWithParams
		});
		return this;
	}

	public clearInvalid(): this
	{
		this.cache.forEach(cache => !this.isValid(cache.expiration) ? this.cache.delete(cache.url) : null);
		return this;
	}

	protected isValid(expiration: number): boolean
	{
		return expiration > Date.now();
	}

	protected getExpiration<T>(request: HttpRequest<T>): number
	{
		return parseFloat(request.headers.get(CacheEnum.cacheExpiration));
	}
}
