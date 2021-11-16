import { Observable } from 'rxjs';
import { Body, Options, OptionsWithBody } from '../common';
import { Id, Method } from '../common';

export interface Crud<CreateRequestBody, CreateResponseBody>
{
	create<
		$CreateRequestBody extends CreateRequestBody,
		$CreateResponseBody extends CreateResponseBody
	>(body : $CreateRequestBody, options ?: Options) : Observable<$CreateResponseBody>;
	read<$>(id : Id, options ?: Options) : Observable<$>;
	find<$>(options ?: Options) : Observable<$>;
	update<$>(id : Id, body : Body, options ?: Options) : Observable<$>;
	patch<$>(id : Id, body : Body, options ?: Options) : Observable<$>;
	delete<$>(id : Id, options ?: Options) : Observable<$>;
	request<$>(method : Method, options ?: OptionsWithBody) : Observable<$>;
}
