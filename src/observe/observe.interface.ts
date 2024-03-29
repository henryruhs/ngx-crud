import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';

import { UniversalMethod } from '../common';

import { ObserveStatus } from './observe.type';

export interface Store
{
	status : BehaviorSubject<ObserveStatus>;
	timer : Subscription;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}

export interface ObserveBeforeEffect
{
	before<T>(request : HttpRequest<T>) : HttpRequest<T>;
}

export interface ObserveAfterEffect
{
	after<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : void
}
