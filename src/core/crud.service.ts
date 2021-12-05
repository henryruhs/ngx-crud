import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, OptionsWithBody } from '../common';
import { CommonService } from '../common';
import { Id, Method } from '../common';
import { CreateService } from './create.service';
import { ReadService } from './read.service';
import { FindService } from './find.service';
import { UpdateService } from './update.service';
import { PatchService } from './patch.service';
import { DeleteService } from './delete.service';
import { CustomService } from './custom.service';
import { Crud } from './crud.interface';
import { NoInfer } from './crud.type';

@Injectable()
export class CrudService<
	RequestBody,
	ResponseBody,
	CreateRequestBody = RequestBody,
	CreateResponseBody = ResponseBody,
	ReadResponseBody = ResponseBody,
	FindResponseBody = ResponseBody[],
	UpdateRequestBody = RequestBody,
	UpdateResponseBody = ResponseBody,
	PatchRequestBody = Partial<RequestBody>,
	PatchResponseBody = ResponseBody,
	DeleteResponseBody = ResponseBody,
	CustomRequestBody = RequestBody,
	CustomResponseBody = ResponseBody | ResponseBody[]
> extends CommonService implements Crud<
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
	protected createService : CreateService<CreateRequestBody, CreateResponseBody>;
	protected readService : ReadService<ReadResponseBody>;
	protected findService : FindService<FindResponseBody>;
	protected updateService : UpdateService<UpdateRequestBody, UpdateResponseBody>;
	protected patchService : PatchService<PatchRequestBody, PatchResponseBody>;
	protected deleteService : DeleteService<DeleteResponseBody>;
	protected customService : CustomService<CustomRequestBody, CustomResponseBody>;

	constructor(protected injector : Injector)
	{
		super(injector);
		this.createService = injector.get<CreateService<CreateRequestBody, CreateResponseBody>>(CreateService);
		this.readService = injector.get<ReadService<ReadResponseBody>>(ReadService);
		this.findService = injector.get<FindService<FindResponseBody>>(FindService);
		this.updateService = injector.get<UpdateService<UpdateRequestBody, UpdateResponseBody>>(UpdateService);
		this.patchService = injector.get<PatchService<PatchRequestBody, PatchResponseBody>>(PatchService);
		this.deleteService = injector.get<DeleteService<DeleteResponseBody>>(DeleteService);
		this.customService = injector.get<CustomService<CustomRequestBody, CustomResponseBody>>(CustomService);
	}

	/**
	 * fires a request to create a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {RequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	create<
		RequestBody = CreateRequestBody,
		ResponseBody = CreateResponseBody
	>(body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.createService.bind(this).create(body, options);
	}

	/**
	 * fires a request to read a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	read<
		ResponseBody = ReadResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	{
		return this.readService.bind(this).read(id, options);
	}

	/**
	 * fires a request to find multiple resources
	 *
	 * @since 8.0.0
	 *
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	find<
		ResponseBody = FindResponseBody
	>(options ?: Options) : Observable<ResponseBody>
	{
		return this.findService.bind(this).find(options);
	}

	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {RequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	update<
		RequestBody = UpdateRequestBody,
		ResponseBody = UpdateResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.updateService.bind(this).update(id, body, options);
	}

	/**
	 * fires a request to partially update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {RequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	patch<
		RequestBody = PatchRequestBody,
		ResponseBody = PatchResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.patchService.bind(this).patch(id, body, options);
	}

	/**
	 * fires a request to delete a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	delete<
		ResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	{
		return this.deleteService.bind(this).delete(id, options);
	}

	/**
	 * fires a custom request
	 *
	 * @since 10.0.0
	 *
	 * @param {Method} method method of the request
	 * @param {OptionsWithBody<RequestBody>} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	custom<
		RequestBody = CustomRequestBody,
		ResponseBody = CustomResponseBody
	>(method : Method, options ?: OptionsWithBody<NoInfer<RequestBody>>) : Observable<ResponseBody>
	{
		return this.customService.bind(this).custom(method, options);
	}
}
