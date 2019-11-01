import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheEnum } from './cache.enum';
import { CacheInterface } from './cache.interface';

@Injectable()
export class CacheService
{
	protected cache: Map<string, CacheInterface> = new Map();

	public get(request: HttpRequest<any>): Observable<HttpResponse<any>>
	{
		const cache: CacheInterface = this.cache.get(request.urlWithParams);

		return cache && this.isValid(cache.expiration) ? cache.response : null;
	}

	public set(request: HttpRequest<any>, response: Observable<HttpResponse<any>>): this
	{
		this.cache.set(request.urlWithParams,
		{
			expiration: this.getExpiration(request),
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

	protected getExpiration(request: HttpRequest<any>): number
	{
		return parseFloat(request.headers.get(CacheEnum.cacheExpiration));
	}
}
