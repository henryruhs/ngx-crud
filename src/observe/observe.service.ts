import { HttpContextToken, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Optional, Inject, Injectable } from '@angular/core';
import { timer, Subject, Subscription } from 'rxjs';
import { Context, ObserveAfterEffect, ObserveBeforeEffect } from './observe.interface';
import { ObserveStatus } from './observe.type';
import { OBSERVE_EFFECT } from './observe.token';

@Injectable()
export class ObserveService
{
	protected defaultContext : Context =
	{
		method: null,
		lifetime: null
	};

	protected token : HttpContextToken<Context> = new HttpContextToken<Context>(() => this.defaultContext);
	protected status : Subject<ObserveStatus> = new Subject<ObserveStatus>();
	protected timer : Subscription = new Subscription();

	constructor(@Optional() @Inject(OBSERVE_EFFECT) protected observeEffect : ObserveBeforeEffect | ObserveAfterEffect)
	{
	}

	getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	start() : this
	{
		this.status.next('STARTED');
		return this;
	}

	before<T>(request : HttpRequest<T>) : HttpRequest<T>
	{
		if (this.observeEffect && 'before' in this.observeEffect)
		{
			return this.observeEffect.before(request);
		}
		return request;
	}

	after<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : this
	{
		if (this.observeEffect && 'after' in this.observeEffect)
		{
			this.observeEffect.after(request, response);
		}
		return this;
	}

	end<T>(request : HttpRequest<T>) : this
	{
		const context : Context = request.context.get(this.getToken());

		this.timer.unsubscribe();
		this.timer = context.lifetime > 0 ? timer(context.lifetime).subscribe(() => this.completeAll()) : new Subscription();
		return this;
	}

	completeAll() : this
	{
		this.status.next('COMPLETED');
		return this;
	}

	observeAll() : Subject<ObserveStatus>
	{
		return this.status;
	}
}
