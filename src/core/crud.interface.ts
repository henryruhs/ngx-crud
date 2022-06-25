import { Observable } from 'rxjs';
import { Options, OptionsWithBody, Id, Method } from '../common';
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
		RequestBody = CreateRequestBody,
		ResponseBody = CreateResponseBody
	>(body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>;
	read<
		ResponseBody = ReadResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	find<
		ResponseBody = FindResponseBody
	>(options ?: Options) : Observable<ResponseBody>;
	update<
		RequestBody = UpdateRequestBody,
		ResponseBody = UpdateResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	patch<
		RequestBody = PatchRequestBody,
		ResponseBody = PatchResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	delete<
		ResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	custom<
		RequestBody = CustomRequestBody,
		ResponseBody = CustomResponseBody
	>(method : Method, options ?: OptionsWithBody<NoInfer<RequestBody>>) : Observable<ResponseBody>
}
