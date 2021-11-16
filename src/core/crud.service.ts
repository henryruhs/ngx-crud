import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Options, OptionsWithBody } from '../common';
import { CommonService } from '../common';
import { Id, Method } from '../common';
import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { GetService } from './get.service';
import { PatchService } from './patch.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { RequestService } from './request.service';
import { Crud } from './crud.interface';

@Injectable()
export class CrudService<
	T,
	Create = T,
	Read = T,
	Find = T[],
	Update = T,
	Patch = T,
	Delete = T,
	Request = T | T[]
> extends CommonService implements Crud
{
	protected deleteService : DeleteService<T>;
	protected findService : FindService<T>;
	protected getService : GetService<T>;
	protected patchService : PatchService<T>;
	protected postService : PostService<T>;
	protected putService : PutService<T>;
	protected requestService : RequestService<T>;

	constructor(protected injector : Injector)
	{
		super(injector);
		this.deleteService = injector.get<DeleteService<T>>(DeleteService);
		this.findService = injector.get<FindService<T>>(FindService);
		this.getService = injector.get<GetService<T>>(GetService);
		this.patchService = injector.get<PatchService<T>>(PatchService);
		this.postService = injector.get<PostService<T>>(PostService);
		this.putService = injector.get<PutService<T>>(PutService);
		this.requestService = injector.get<RequestService<T>>(RequestService);
	}

	/**
	 * fires a request to create a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Body} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public create<$ = Create>(body : Body, options ?: Options) : Observable<$>
	{
		return this.postService.bind(this).post<$>(body, options);
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
		return this.getService.bind(this).get<$>(id, options);
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
		return this.putService.bind(this).put<$>(id, body, options);
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
