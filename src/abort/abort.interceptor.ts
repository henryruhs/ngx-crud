import
{
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContextInterface } from './abort.interface';
import { AbortService } from './abort.service';

@Injectable()
export class AbortInterceptor implements HttpInterceptor
{
	constructor(protected abortService : AbortService)
	{
	}

	/**
	 * intercept the request
	 *
	 * @since 4.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {HttpHandler} next instance of the http handler
	 *
	 * @return {Observable<HttpEvent<T>>} http event
	 */

	public intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const context : ContextInterface = request.context.get(this.abortService.getToken());
		const enableAbort : boolean = context.method === 'ANY' || context.method === request.method && context.lifetime > 0;

		return enableAbort ? this.handle(request, next) : next.handle(request);
	}

	/**
	 * handle the request
	 *
	 * @since 4.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {HttpHandler} next instance of the http handler
	 *
	 * @return {Observable<HttpEvent<T>>} http event
	 */

	public handle<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		return next
			.handle(request)
			.pipe(
				takeUntil(this.abortService.get(request))
			);
	}
}
