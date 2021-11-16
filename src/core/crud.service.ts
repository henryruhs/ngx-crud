import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Options, OptionsWithBody } from '../common';
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
	// to be implemented from here on
	Read = ResponseBody,
	Find = ResponseBody[],
	Update = ResponseBody,
	//PatchRequestBody = Partial<RequestBody>,
	Patch = ResponseBody,
	Delete = ResponseBody,
	Request = ResponseBody | ResponseBody[]
> extends CommonService implements Crud<CreateRequestBody, CreateResponseBody>
{
	protected createService : CreateService<CreateRequestBody, CreateResponseBody>;
	protected readService : ReadService<ResponseBody>;
	protected findService : FindService<ResponseBody>;
	protected updateService : UpdateService<ResponseBody>;
	protected patchService : PatchService<ResponseBody>;
	protected deleteService : DeleteService<ResponseBody>;
	protected requestService : RequestService<ResponseBody>;

	constructor(protected injector : Injector)
	{
		super(injector);
		this.createService = injector.get<CreateService<CreateRequestBody, CreateResponseBody>>(CreateService);
		this.readService = injector.get<ReadService<ResponseBody>>(ReadService);
		this.findService = injector.get<FindService<ResponseBody>>(FindService);
		this.updateService = injector.get<UpdateService<ResponseBody>>(UpdateService);
		this.patchService = injector.get<PatchService<ResponseBody>>(PatchService);
		this.deleteService = injector.get<DeleteService<ResponseBody>>(DeleteService);
		this.requestService = injector.get<RequestService<ResponseBody>>(RequestService);
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
		$CreateResponseBody extends CreateResponseBody
	>(body : $CreateRequestBody, options ?: Options) : Observable<$CreateResponseBody>
	{
		return this.createService.bind(this).create<$CreateRequestBody, $CreateResponseBody>(body, options);
	}

	/**
	 * fires a request to read a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public read<$ = Read>(id : Id, options ?: Options) : Observable<$>
	{
		return this.readService.bind(this).read<$>(id, options);
	}

	/**
	 * fires a request to find multiple resources
	 *
	 * @since 8.0.0
	 *
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public find<$ = Find>(options ?: Options) : Observable<$>
	{
		return this.findService.bind(this).find<$>(options);
	}

	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Body} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public update<$ = Update>(id : Id, body : Body, options ?: Options) : Observable<$>
	{
		return this.updateService.bind(this).update<$>(id, body, options);
	}

	/**
	 * fires a request to partially update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Body} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public patch<$ = Patch>(id : Id, body : Body, options ?: Options) : Observable<$>
	{
		return this.patchService.bind(this).patch<$>(id, body, options);
	}

	/**
	 * fires a request to delete a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public delete<$ = Delete>(id : Id, options ?: Options) : Observable<$>
	{
		return this.deleteService.bind(this).delete<$>(id, options);
	}

	/**
	 * fires a non-standard request
	 *
	 * @since 8.0.0
	 *
	 * @param {Method} method method of the request
	 * @param {OptionsWithBody} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public request<$ = Request>(method : Method, options ?: OptionsWithBody) : Observable<$>
	{
		return this.requestService.bind(this).request<$>(method, options);
	}
}
