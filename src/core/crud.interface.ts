import { Observable } from 'rxjs';
import { Options, OptionsWithBody } from '../common';
import { Id, Method } from '../common';
import { NoInfer } from './crud.type';

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
		$CreateRequestBody = CreateRequestBody,
		$CreateResponseBody = CreateResponseBody
	>(body : NoInfer<$CreateRequestBody>, options ?: Options) : Observable<$CreateResponseBody>;
	read<
		$ReadResponseBody = ReadResponseBody
	>(id : Id, options ?: Options) : Observable<$ReadResponseBody>
	find<
		$FindResponseBody = FindResponseBody
	>(options ?: Options) : Observable<$FindResponseBody>;
	update<
		$UpdateRequestBody = UpdateRequestBody,
		$UpdateResponseBody = UpdateResponseBody
	>(id : Id, body : NoInfer<$UpdateRequestBody>, options ?: Options) : Observable<$UpdateResponseBody>
	patch<
		$PatchRequestBody = PatchRequestBody,
		$PatchResponseBody = PatchResponseBody
	>(id : Id, body : NoInfer<$PatchRequestBody>, options ?: Options) : Observable<$PatchResponseBody>
	delete<
		$DeleteResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<$DeleteResponseBody>
	custom<
		$CustomRequestBody = CustomRequestBody,
		$CustomResponseBody = CustomResponseBody
	>(method : Method, options ?: OptionsWithBody<NoInfer<$CustomRequestBody>>) : Observable<$CustomResponseBody>
}
