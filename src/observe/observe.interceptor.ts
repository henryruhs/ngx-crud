import
{
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, tap } from 'rxjs/operators';
import { Context } from './observe.interface';
import { ObserveService } from './observe.service';

@Injectable()
export class ObserveInterceptor implements HttpInterceptor
{
	constructor(protected observeService : ObserveService)
	{
	}

	intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const context : Context = request.context.get(this.observeService.getToken());
		const enableObserve : boolean = (context.method === 'ANY' || context.method === request.method) && context.lifetime > 0;

		return enableObserve ? this.handle(request, next) : next.handle(request);
	}

	handle<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		this.observeService.start();
		return next
			.handle(this.observeService.before(request))
			.pipe(
				filter(event => event instanceof HttpResponse),
				tap((response : HttpResponse<T>) => this.observeService.after(request, response)),
				catchError((response : HttpErrorResponse) =>
				{
					this.observeService.after(request, response);
					return throwError(() => response);
				}),
				finalize(() => this.observeService.end(request))
			);
	}
}
