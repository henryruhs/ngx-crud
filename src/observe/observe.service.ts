import { HttpContextToken, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Optional, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContextInterface, ObserveEffectInterface } from './observe.interface';
import { StateType } from './observe.type';
import { OBSERVE_EFFECT } from './observe.token';

@Injectable()
export class ObserveService
{
	protected defaultContext : ContextInterface =
	{
		method: null,
		lifetime: null
	};
	protected token : HttpContextToken<ContextInterface> = new HttpContextToken<ContextInterface>(() => this.defaultContext);
	protected state : Subject<StateType> = new Subject<StateType>();
	protected timeout : NodeJS.Timeout;

	constructor(@Optional() @Inject(OBSERVE_EFFECT) protected observeEffect : ObserveEffectInterface)
	{
	}

	/**
	 * get the token of the context
	 *
	 * @since 6.0.0
	 *
	 * @return {HttpContextToken<ContextInterface>} token of the context
	 */

	public getToken() : HttpContextToken<ContextInterface>
	{
		return this.token;
	}

	/**
	 * start to observe the request
	 *
	 * @since 8.0.0
	 *
	 * @return {this} instance of the service
	 */

	public start() : this
	{
		this.state.next('STARTED');
		return this;
	}

	/**
	 * before hook for the effect service
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {HttpRequest<T>} instance of the http request
	 */

	public before<T>(request : HttpRequest<T>) : HttpRequest<T>
	{
		if (typeof this.observeEffect?.before === 'function')
		{
			return this.observeEffect.before(request);
		}
		return request;
	}

	/**
	 * after hook for the effect service
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {HttpResponse<T> | HttpErrorResponse} response instance of the http response
	 *
	 * @return {this} instance of the service
	 */

	public after<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : this
	{
		if (typeof this.observeEffect?.after === 'function')
		{
			this.observeEffect.after(request, response);
		}
		return this;
	}

	/**
	 * end to observe the request
	 *
	 * @since 5.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {this} instance of the service
	 */

	public end<T>(request : HttpRequest<T>) : this
	{
		const context : ContextInterface = request.context.get(this.getToken());

		clearTimeout(this.timeout);
		this.timeout = context.lifetime > 0 ? setTimeout(() => this.completeAll(), context.lifetime) : null;
		return this;
	}

	/**
	 * complete to observe for enabled services
	 *
	 * @since 8.0.0
	 *
	 * @return {this} instance of the service
	 */

	public completeAll() : this
	{
		this.state.next('COMPLETED');
		return this;
	}

	/**
	 * observe all requests for enabled services
	 *
	 * @since 8.0.0
	 *
	 * @return {Subject<boolean>} state of all requests
	 */

	public observeAll() : Subject<StateType>
	{
		return this.state;
	}
}
