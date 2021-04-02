import { AnyType, MethodType } from './common.type';

export interface ContextInterface
{
	method : AnyType | MethodType;
	lifetime : number;
}
