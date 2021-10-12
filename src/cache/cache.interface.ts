import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniversalMethodType } from '../common';

export interface StoreInterface
{
	response : Observable<HttpResponse<any>>;
	timeout : NodeJS.Timeout;
}

export interface ContextInterface
{
	method : UniversalMethodType;
	lifetime : number;
}
