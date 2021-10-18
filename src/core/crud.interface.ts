import { Observable, ObservableInput } from 'rxjs';
import { Body, Options, OptionsWithBody } from '../common';
import { Id, Method } from '../common';

export interface CrudInterface<T>
{
	create<$ = T>(body : Body, options ?: Options) : Observable<$>;
	read<$ = T>(id : Id, options ?: Options) : Observable<$>;
	find<$ = T[]>(options ?: Options) : Observable<$>;
	update<$ = T>(id : Id, body : Body, options ?: Options) : Observable<$>;
	patch<$ = T>(id : Id, body : Body, options ?: Options) : Observable<$>;
	delete<$ = T>(id : Id, options ?: Options) : Observable<$>;
	request<$ = T | T[]>(method : Method, options ?: OptionsWithBody) : Observable<$>;
	parallel<$ = T>(requestArray : ObservableInput<$>[]) : Observable<$[]>;
}
