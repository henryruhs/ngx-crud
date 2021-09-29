import { HttpContextToken, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContextInterface } from './observe.interface';

@Injectable()
export class ObserveService
{
	protected defaultContext : ContextInterface =
	{
		method: 'GET',
		lifetime: null
	};
	protected token : HttpContextToken<ContextInterface> = new HttpContextToken<ContextInterface>(() => this.defaultContext);
	protected signal : Subject<boolean> = new Subject<boolean>();
	protected timeout : NodeJS.Timeout;

	/**
	 * get the token of the context
	 *
	 * @since 6.0.0
	 *
	 * @return token of the context
	 */

	public getToken() : HttpContextToken<ContextInterface>
	{
		return this.token;
	}

	/**
	 * start the observe for enabled services
	 *
	 * @since 5.0.0
	 *
	 * @return instance of the service
	 */

	public start() : this
	{
		this.signal.next(true);
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
		const context : ContextInterface = request.context.get(this.getToken());

		clearTimeout(this.timeout);
		this.timeout = context.lifetime > 0 ? setTimeout(() => this.completeAll(), context.lifetime) : null;
		return this;
	}

	/**
	 * complete all observers for enabled services
	 *
	 * @since 6.0.0
	 *
	 * @return instance of the service
	 */

	public completeAll() : this
	{
		this.signal.next(false);
		return this;
	}

	/**
	 * observe all requests for enabled services
	 *
	 * @since 5.0.0
	 *
	 * @return instance of the signal
	 */

	public observeAll() : Subject<boolean>
	{
		return this.signal;
	}
}
