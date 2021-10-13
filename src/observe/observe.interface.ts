import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { UniversalMethodType } from '../common';

export interface ContextInterface
{
	method : UniversalMethodType;
	lifetime : number;
}

export interface ObserveEffectInterface
{
	before?<T>(request : HttpRequest<T>) : HttpRequest<T>;
	after?<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : void
}
