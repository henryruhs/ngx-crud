import
{
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ObserveEnum } from './observe.enum';
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
	 * @param request instance of the http request
	 * @param next instance of the http handler
	 *
	 * @return http event as observable
	 */

	public intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const enableLoader : boolean = request.headers.has(ObserveEnum.method) &&
			request.headers.get(ObserveEnum.method) === request.method &&
			request.headers.has(ObserveEnum.lifetime);

		return enableLoader ? this.handle(request, next) : next.handle(request);
	}

	/**
	 * handle the request
	 *
	 * @since 5.0.0
	 *
	 * @param request instance of the http request
	 * @param next instance of the http handler
	 *
	 * @return http event as observable
	 */

	public handle<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		this.observeService.start();
		return next
			.handle(request)
			.pipe(
				finalize(() => this.observeService.end(request))
			);
	}
}
