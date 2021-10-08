import
{
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ContextInterface } from './observe.interface';
import { ObserveService } from './observe.service';

@Injectable()
export class ObserveInterceptor implements HttpInterceptor
{
	constructor(protected observeService : ObserveService)
	{
	}

	/**
	 * intercept the request
	 *
	 * @since 5.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {HttpHandler} next instance of the http handler
	 *
	 * @return {Observable<HttpEvent<T>>} http event
	 */

	public intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const context : ContextInterface = request.context.get(this.observeService.getToken());
		const enableObserve : boolean = context.method === 'ANY' || context.method === request.method && context.lifetime > 0;

		return enableObserve ? this.handle(request, next) : next.handle(request);
	}

	/**
	 * handle the request
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {HttpHandler} next instance of the http handler
	 *
	 * @return {Observable<HttpEvent<T>>} http event
	 */

	public handle<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		this.observeService.start();
		return next
			.handle(request)
			.pipe(
				tap((event : HttpEvent<T>) => this.observeService.effect(event)),
				finalize(() => this.observeService.end(request))
			);
	}
}
