import { Subject } from 'rxjs';
import { UniversalMethodType } from '../common/common.type';

export interface StoreInterface
{
	signal : Subject<boolean>;
	timeout : NodeJS.Timeout;
}

export interface ContextInterface
{
	method : UniversalMethodType;
	lifetime : number;
}
