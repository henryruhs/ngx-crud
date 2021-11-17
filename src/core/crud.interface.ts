import { Observable } from 'rxjs';
import { Body, Options, OptionsWithBody } from '../common';
import { Id, Method } from '../common';

export interface Crud<CreateRequestBody, CreateResponseBody, ReadResponseBody, FindResponseBody>
{
	create<
		$CreateRequestBody extends CreateRequestBody,
		$CreateResponseBody extends CreateResponseBody
	>(body : $CreateRequestBody, options ?: Options) : Observable<$CreateResponseBody>;
	read<$ReadResponseBody = ReadResponseBody>(id : Id, options ?: Options) : Observable<$ReadResponseBody>
	find<$FindResponseBody = FindResponseBody>(options ?: Options) : Observable<$FindResponseBody>;
	update<$>(id : Id, body : Body, options ?: Options) : Observable<$>;
	patch<$>(id : Id, body : Body, options ?: Options) : Observable<$>;
	delete<$>(id : Id, options ?: Options) : Observable<$>;
	request<$>(method : Method, options ?: OptionsWithBody) : Observable<$>;
}
