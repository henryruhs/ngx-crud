import { Injectable, Injector } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { BodyInterface, OptionInterface, OptionWithBodyInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType, MethodType } from './common.type';
import { BatchService } from './batch.service';
import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { GetService } from './get.service';
import { PatchService } from './patch.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { RequestService } from './request.service';

@Injectable()
export class CrudService<T> extends CommonService
{
	protected batchService : BatchService<T>;
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
		this.batchService = injector.get<BatchService<T>>(BatchService);
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
	 * @since 1.0.0
	 *
	 * @param {BodyInterface} body body of the request
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T>} http response
	 */

	public create(body : BodyInterface, options ?: OptionInterface) : Observable<T>
	{
		return this.postService.bind(this).post(body, options);
	}

	/**
	 * fires a request to read a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T>} http response
	 */

	public read(id : IdType, options ?: OptionInterface) : Observable<T>
	{
		return this.getService.bind(this).get(id, options);
	}

	/**
	 * fires a request to find multiple resources
	 *
	 * @since 1.0.0
	 *
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T[]>} http response
	 */

	public find(options ?: OptionInterface) : Observable<T[]>
	{
		return this.findService.bind(this).find(options);
	}

	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {BodyInterface} body body of the request
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T>} http response
	 */

	public update(id : IdType, body : BodyInterface, options ?: OptionInterface) : Observable<T>
	{
		return this.putService.bind(this).put(id, body, options);
	}

	/**
	 * fires a request to partially update a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {BodyInterface} body body of the request
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T>} http response
	 */

	public patch(id : IdType, body : BodyInterface, options ?: OptionInterface) : Observable<T>
	{
		return this.patchService.bind(this).patch(id, body, options);
	}

	/**
	 * fires a request to delete a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T>} http response
	 */

	public delete(id : IdType, options ?: OptionInterface) : Observable<T>
	{
		return this.deleteService.bind(this).delete(id, options);
	}

	/**
	 * fires a non-standard request
	 *
	 * @since 2.0.0
	 *
	 * @param {MethodType} method method of the request
	 * @param {OptionWithBodyInterface} options options of the request
	 *
	 * @return {Observable<T | T[]>} http response
	 */

	public request(method : MethodType, options ?: OptionWithBodyInterface) : Observable<T | T[]>
	{
		return this.requestService.bind(this).request(method, options);
	}

	/**
	 * fires multiple requests in parallel
	 *
	 * @since 4.2.0
	 *
	 * @param {ObservableInput<T>[]} requestArray collection of requests
	 *
	 * @return {Observable<T[]>} multiple http responses
	 */

	public parallel(requestArray : ObservableInput<T>[]) : Observable<T[]>
	{
		return this.batchService.parallel(requestArray);
	}
}
