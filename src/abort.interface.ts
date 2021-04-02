import { Subject } from 'rxjs';
import { UniversalMethodType } from './common.type';

export interface StoreInterface
{
	signal : Subject<void>;
	timeout : NodeJS.Timeout;
}

export interface ContextInterface
{
	method : UniversalMethodType;
	lifetime : number;
}
