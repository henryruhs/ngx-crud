import { Observable } from 'rxjs';
import { Options, OptionsWithBody } from '../common';
import { Id, Method } from '../common';

export interface Crud<
	CreateRequestBody,
	CreateResponseBody,
	ReadResponseBody,
	FindResponseBody,
	UpdateRequestBody,
	UpdateResponseBody,
	PatchRequestBody,
	PatchResponseBody,
	DeleteResponseBody,
	CustomRequestBody,
	CustomResponseBody
>
{
	create<
		$CreateRequestBody extends CreateRequestBody,
		$CreateResponseBody = CreateResponseBody
	>(body : $CreateRequestBody, options ?: Options) : Observable<$CreateResponseBody>;
	read<
		$ReadResponseBody = ReadResponseBody
	>(id : Id, options ?: Options) : Observable<$ReadResponseBody>
	find<
		$FindResponseBody = FindResponseBody
	>(options ?: Options) : Observable<$FindResponseBody>;
	update<
		$UpdateRequestBody extends UpdateRequestBody,
		$UpdateResponseBody = UpdateResponseBody
	>(id : Id, body : $UpdateRequestBody, options ?: Options) : Observable<$UpdateResponseBody>
	patch<
		$PatchRequestBody extends PatchRequestBody,
		$PatchResponseBody = PatchResponseBody
	>(id : Id, body : $PatchRequestBody, options ?: Options) : Observable<$PatchResponseBody>
	delete<
		$DeleteResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<$DeleteResponseBody>
	custom<
		$CustomRequestBody extends CustomRequestBody,
		$CustomResponseBody = CustomResponseBody
	>(method : Method, options ?: OptionsWithBody<$CustomRequestBody>) : Observable<$CustomResponseBody>
}
