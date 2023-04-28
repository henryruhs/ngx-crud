import
{
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { filter, share, tap } from 'rxjs/operators';

import { Context } from './cache.interface';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor
{
	constructor(protected cacheService : CacheService)
	{
	}

	intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const context : Context = request.context.get(this.cacheService.getToken());
		const enableCache : boolean = (context.method === 'ANY' || context.method === request.method) && context.lifetime > 0;

		return enableCache ? this.handle(request, next) : next.handle(request);
	}

	protected handle<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		return this.cacheService.has(request) ? this.cacheService.get(request) : this.store(request, next);
	}

	protected store<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpResponse<T>>
	{
		const nextHandler : Observable<HttpResponse<T>> = next
			.handle(request)
			.pipe(
				filter(event => event instanceof HttpResponse),
				tap((response : HttpResponse<T>) => this.cacheService.set(request, of(response))),
				share(
				{
					connector: () => new ReplaySubject()
				})
			);

		this.cacheService.set(request, nextHandler);
		return nextHandler;
	}
}
