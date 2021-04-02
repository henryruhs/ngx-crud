import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnyType, MethodType } from './common.type';

export interface CacheInterface
{
	response : Observable<HttpResponse<any>>;
	timeout : NodeJS.Timeout;
}

export interface ContextInterface
{
	method : AnyType | MethodType;
	lifetime : number;
}
