import
{
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Context } from './abort.interface';
import { AbortService } from './abort.service';

@Injectable()
export class AbortInterceptor implements HttpInterceptor
{
	constructor(protected abortService : AbortService)
	{
	}

	intercept<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		const context : Context = request.context.get(this.abortService.getToken());
		const enableAbort : boolean = (context.method === 'ANY' || context.method === request.method) && context.lifetime > 0;

		return enableAbort ? this.handle(request, next) : next.handle(request);
	}

	handle<T>(request : HttpRequest<T>, next : HttpHandler) : Observable<HttpEvent<T>>
	{
		return next
			.handle(request)
			.pipe(
				takeUntil(this.abortService.get(request).pipe(filter(signal => signal === 'ABORTED')))
			);
	}
}
