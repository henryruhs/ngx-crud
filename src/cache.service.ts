import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheEnum } from './cache.enum';
import { CacheInterface } from './cache.interface';

@Injectable()
export class CacheService
{
	protected cache: Map<string, CacheInterface> = new Map();

	public get(request: HttpRequest<any>): HttpResponse<any>
	{
		const cache: CacheInterface = this.cache.get(request.urlWithParams);

		return this.isValid(cache) ? cache.response : null;
	}

	public set(request: HttpRequest<any>, response: HttpResponse<any>): this
	{
		this.cache.set(request.urlWithParams,
		{
			expiration: this.getExpiration(request),
			response,
			url: request.urlWithParams
		});
		return this;
	}

	public tidyUp(): this
	{
		this.cache.forEach(cache => !this.isValid(cache) ? this.cache.delete(cache.url) : null);
		return this;
	}

	protected isValid(cache: CacheInterface): boolean
	{
		return cache && cache.expiration > Date.now();
	}

	protected getExpiration(request: HttpRequest<any>): number
	{
		return parseFloat(request.headers.get(CacheEnum.cacheExpiration));
	}
}
