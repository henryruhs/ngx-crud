import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, OptionsWithBody } from '../common';
import { CommonService } from '../common';
import { Id, Method } from '../common';
import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { ReadService } from './read.service';
import { PatchService } from './patch.service';
import { CreateService } from './create.service';
import { UpdateService } from './update.service';
import { RequestService } from './request.service';
import { Crud } from './crud.interface';

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
	RequestRequestBody = RequestBody,
	RequestResponseBody = ResponseBody | ResponseBody[]
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
	RequestRequestBody,
	RequestResponseBody
>
{
	protected createService : CreateService<CreateRequestBody, CreateResponseBody>;
	protected readService : ReadService<ReadResponseBody>;
	protected findService : FindService<FindResponseBody>;
	protected updateService : UpdateService<UpdateRequestBody, UpdateResponseBody>;
	protected patchService : PatchService<PatchRequestBody, PatchResponseBody>;
	protected deleteService : DeleteService<DeleteResponseBody>;
	protected requestService : RequestService<RequestRequestBody, RequestResponseBody>;

	constructor(protected injector : Injector)
	{
		super(injector);
		this.createService = injector.get<CreateService<CreateRequestBody, CreateResponseBody>>(CreateService);
		this.readService = injector.get<ReadService<ReadResponseBody>>(ReadService);
		this.findService = injector.get<FindService<FindResponseBody>>(FindService);
		this.updateService = injector.get<UpdateService<UpdateRequestBody, UpdateResponseBody>>(UpdateService);
		this.patchService = injector.get<PatchService<PatchRequestBody, PatchResponseBody>>(PatchService);
		this.deleteService = injector.get<DeleteService<DeleteResponseBody>>(DeleteService);
		this.requestService = injector.get<RequestService<RequestRequestBody, RequestResponseBody>>(RequestService);
	}

	/**
	 * fires a request to create a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {$CreateRequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$CreateResponseBody>} http response
	 */

	public create<
		$CreateRequestBody extends CreateRequestBody,
		$CreateResponseBody = CreateResponseBody
	>(body : $CreateRequestBody, options ?: Options) : Observable<$CreateResponseBody>
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
	 * @return {Observable<$ReadResponseBody>} http response
	 */

	public read<
		$ReadResponseBody = ReadResponseBody
	>(id : Id, options ?: Options) : Observable<$ReadResponseBody>
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
	 * @return {Observable<$FindResponseBody>} http response
	 */

	public find<
		$FindResponseBody = FindResponseBody
	>(options ?: Options) : Observable<$FindResponseBody>
	{
		return this.findService.bind(this).find(options);
	}

	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {$UpdateRequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$UpdateResponseBody>} http response
	 */

	public update<
		$UpdateRequestBody extends UpdateRequestBody,
		$UpdateResponseBody = UpdateResponseBody
	>(id : Id, body : $UpdateRequestBody, options ?: Options) : Observable<$UpdateResponseBody>
	{
		return this.updateService.bind(this).update(id, body, options);
	}

	/**
	 * fires a request to partially update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {$PatchRequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$PatchResponseBody>} http response
	 */

	public patch<
		$PatchRequestBody extends PatchRequestBody,
		$PatchResponseBody = PatchResponseBody
	>(id : Id, body : $PatchRequestBody, options ?: Options) : Observable<$PatchResponseBody>
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
	 * @return {Observable<$DeleteResponseBody>} http response
	 */

	public delete<
		$DeleteResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<$DeleteResponseBody>
	{
		return this.deleteService.bind(this).delete(id, options);
	}

	/**
	 * fires a non-standard request
	 *
	 * @since 8.0.0
	 *
	 * @param {Method} method method of the request
	 * @param {OptionsWithBody<$RequestRequestBody>} options options of the request
	 *
	 * @return {Observable<$RequestResponseBody>} http response
	 */

	public request<
		$RequestRequestBody = RequestRequestBody,
		$RequestResponseBody = RequestResponseBody
	>(method : Method, options ?: OptionsWithBody<$RequestRequestBody>) : Observable<$RequestResponseBody>
	{
		return this.requestService.bind(this).request(method, options);
	}
}
