import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniversalMethod } from '../common';

export interface Store
{
	response : Observable<HttpResponse<any>>;
	timeout : NodeJS.Timeout;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}
