import { BehaviorSubject, Subscription } from 'rxjs';
import { UniversalMethod } from '../common';

export interface Store
{
	controller : BehaviorSubject<AbortController>;
	timer : Subscription;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}
