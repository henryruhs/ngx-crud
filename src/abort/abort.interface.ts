import { Subject, Subscription } from 'rxjs';
import { UniversalMethod } from '../common';

export interface Store
{
	controller : Subject<AbortController>;
	timer : Subscription;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}
