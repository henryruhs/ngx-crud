import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
		const doCache: boolean = request.headers.has(CacheEnum.cache) && request.headers.has(CacheEnum.cacheExpiration);

		return doCache ? this.getRequest(request, next) : this.sendRequest(request, next);
	}

	public getRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		const cachedResponse: HttpResponse<any> = this.cacheService.get(request);

		return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
	}

	public sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		return next
			.handle(request)
			.pipe(
				filter(event => event instanceof HttpResponse),
				tap((response: HttpResponse<any>) => this.cacheService.set(request, response).tidyUp())
			);
	}
}
