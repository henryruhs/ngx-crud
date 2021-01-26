import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Timeout = NodeJS.Timeout;
import { ObserveEnum } from './observe.enum';

@Injectable()
export class ObserveService
{
	protected timeout : Timeout;
	protected store : Subject<boolean> = new Subject<boolean>();

	/**
	 * start the observe for the request
	 *
	 * @since 5.0.0
	 *
	 * @return instance of the service
	 */

	public start() : this
	{
		this.store.next(true);
		return this;
	}

	/**
	 * end the observe for the request
	 *
	 * @since 5.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return instance of the service
	 */

	public end<T>(request : HttpRequest<T>) : this
	{
		const lifetime : number = this.getLifetime(request);

		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => this.store.next(false), lifetime);
		return this;
	}

	/**
	 * observe all requests for enabled services
	 *
	 * @since 5.0.0
	 *
	 * @return instance of the store
	 */

	public observeAll() : Subject<boolean>
	{
		return this.store;
	}

	/**
	 * get the lifetime of the request
	 *
	 * @since 5.0.0
	 *
	 * @param request instance of the http request
	 *
	 * @return lifetime of the request
	 */

	protected getLifetime<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(ObserveEnum.lifetime));
	}
}
