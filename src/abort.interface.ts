import { Subject } from 'rxjs';
import { AnyType, MethodType } from './common.type';

export interface AbortInterface
{
	signal : Subject<void>;
	timeout : NodeJS.Timeout;
}

export interface ContextInterface
{
	method : AnyType | MethodType;
	lifetime : number;
}
