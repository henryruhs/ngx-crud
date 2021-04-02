import
{
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, publishReplay, refCount, tap } from 'rxjs/operators';
import { ContextInterface } from './cache.interface';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor
{
	constructor(protected cacheService : CacheService)
	{
	}

	/**
	 * intercept the request
	 *
	 * @since 3.0.0
	 *
	 * @param request instance of the http request
	 * @param next instance of the http handler
	 *
	 * @return http event as observable
	 */

	public intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const context : ContextInterface = request.context.get(this.cacheService.getToken());
		const enableCache : boolean = context.method === 'ANY' || context.method === request.method && context.lifetime > 0;

		return enableCache ? this.handle(request, next) : next.handle(request);
	}

	/**
	 * handle the request
	 *
	 * @since 3.0.0
	 *
	 * @param request instance of the http request
	 * @param next instance of the http handler
	 *
	 * @return http event as observable
	 */

	protected handle<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		return this.cacheService.has(request) ? this.cacheService.get(request) : this.store(request, next);
	}

	/**
	 * store the request
	 *
	 * @since 3.0.0
	 *
	 * @param request instance of the http request
	 * @param next instance of the http handler
	 *
	 * @return http response as observable
	 */

	protected store<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpResponse<T>>
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
