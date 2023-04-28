import { HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { UniversalMethod } from '../common';

export interface Store
{
	response : Observable<HttpResponse<any>>;
	timer : Subscription;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}
