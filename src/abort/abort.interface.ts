import { BehaviorSubject, Subscription } from 'rxjs';

import { UniversalMethod } from '../common';

import { AbortSignal } from './abort.type';

export interface Store
{
	signal : BehaviorSubject<AbortSignal>;
	timer : Subscription;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}
