import { Subject, Subscription } from 'rxjs';
import { UniversalMethod } from '../common';

export interface Store
{
	signal : Subject<boolean>;
	timer : Subscription;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}
