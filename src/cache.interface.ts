import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MethodType } from './common.type';

export interface CacheInterface
{
	response : Observable<HttpResponse<any>>;
	timeout : NodeJS.Timeout;
}

export interface ContextInterface
{
	method : MethodType;
	lifetime : number;
}
