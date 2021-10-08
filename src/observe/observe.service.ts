import { HttpContextToken, HttpEvent, HttpRequest } from '@angular/common/http';
import { Optional, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContextInterface, EffectInterface } from './observe.interface';
import { StateType } from './observe.type';
import { EFFECT_SERVICE } from './observe.token';

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

	constructor(@Optional() @Inject(EFFECT_SERVICE) protected effectService : EffectInterface)
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
	 * effect to handle events
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpEvent<T>} event http event
	 *
	 * @return {void}
	 */

	public effect<T>(event : HttpEvent<T>) : void
	{
		this.effectService?.effect(event);
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
