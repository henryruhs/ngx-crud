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
	constructor(protected cacheService: CacheService)
	{
	}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		const doCache: boolean = request.headers.has(CacheEnum.cacheMethod) &&
			request.headers.get(CacheEnum.cacheMethod) === request.method &&
			request.headers.has(CacheEnum.cacheExpiration);

		return doCache ? this.getRequest(request, next) : next.handle(request);
	}

	public getRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		const cachedResponse: Observable<HttpEvent<any>> = this.cacheService.get(request);

		return cachedResponse ? cachedResponse : this.sendRequest(request, next);
	}

	public sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpResponse<any>>
	{
		const nextHandler : Observable<HttpResponse<any>> = next
			.handle(request)
			.pipe(
				filter(event => event instanceof HttpResponse),
				tap((response: HttpResponse<any>) => this.cacheService.set(request, of(response)).tidyUp()),
				publishReplay(),
				refCount()
			);

		this.cacheService.set(request, nextHandler).tidyUp();
		return nextHandler;
	}
}
