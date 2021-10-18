import { Subject } from 'rxjs';
import { UniversalMethod } from '../common';

export interface Store
{
	signal : Subject<boolean>;
	timeout : NodeJS.Timeout;
}

export interface Context
{
	method : UniversalMethod;
	lifetime : number;
}
