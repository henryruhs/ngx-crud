import { HttpEvent } from '@angular/common/http';
import { UniversalMethodType } from './common.type';

export interface ContextInterface
{
	method : UniversalMethodType;
	lifetime : number;
}

export interface EffectInterface
{
	effect<T>(event : HttpEvent<T>) : void;
}
