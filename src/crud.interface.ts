import { Observable, ObservableInput } from 'rxjs';
import { BodyInterface, OptionInterface, OptionWithBodyInterface } from './common.interface';
import { IdType, MethodType } from './common.type';

export interface CrudInterface<T>
{
	create<$ = T>(body : BodyInterface, options ?: OptionInterface) : Observable<$>;
	read<$ = T>(id : IdType, options ?: OptionInterface) : Observable<$>;
	find<$ = T[]>(options ?: OptionInterface) : Observable<$>;
	update<$ = T>(id : IdType, body : BodyInterface, options ?: OptionInterface) : Observable<$>;
	patch<$ = T>(id : IdType, body : BodyInterface, options ?: OptionInterface) : Observable<$>;
	delete<$ = T>(id : IdType, options ?: OptionInterface) : Observable<$>;
	request<$ = T | T[]>(method : MethodType, options ?: OptionWithBodyInterface) : Observable<$>;
	parallel<$ = T>(requestArray : ObservableInput<$>[]) : Observable<$[]>;
}
