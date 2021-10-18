import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { UniversalMethod } from '../common';

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
