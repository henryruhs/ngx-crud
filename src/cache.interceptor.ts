import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, publishReplay, refCount, tap } from 'rxjs/operators';

import { CacheEnum } from './cache.enum';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor
{
	constructor(protected cacheService : CacheService)
	{
	}

	public intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const doCache : boolean = request.headers.has(CacheEnum.cacheMethod) &&
			request.headers.get(CacheEnum.cacheMethod) === request.method &&
			request.headers.has(CacheEnum.cacheExpiration);

		return doCache ? this.getRequest(request, next) : next.handle(request);
	}

	protected getRequest<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const cachedResponse : Observable<HttpEvent<T>> = this.cacheService.clearInvalid().get(request);

		return cachedResponse ? cachedResponse : this.storeRequest(request, next);
	}

	protected storeRequest<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpResponse<T>>
	{
		const nextHandler : Observable<HttpResponse<T>> = next
			.handle(request)
			.pipe(
				filter(event => event instanceof HttpResponse),
				tap((response : HttpResponse<T>) => this.cacheService.set(request, of(response))),
				publishReplay(),
				refCount()
			);

		this.cacheService.set(request, nextHandler);
		return nextHandler;
	}
}
