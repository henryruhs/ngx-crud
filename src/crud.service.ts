import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface, OptionWithBodyInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType, MethodType } from './common.type';
import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { PatchService } from './patch.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { RequestService } from './request.service';

@Injectable()
export class CrudService<T> extends CommonService
{
	protected deleteService : DeleteService<T>;
	protected getService : GetService<T>;
	protected patchService : PatchService<T>;
	protected postService : PostService<T>;
	protected putService : PutService<T>;
	protected requestService : RequestService<T>;

	constructor(protected injector : Injector)
	{
		super(injector);
		this.deleteService = injector.get<DeleteService<T>>(DeleteService);
		this.getService = injector.get<GetService<T>>(GetService);
		this.patchService = injector.get<PatchService<T>>(PatchService);
		this.postService = injector.get<PostService<T>>(PostService);
		this.putService = injector.get<PutService<T>>(PutService);
		this.requestService = injector.get<RequestService<T>>(RequestService);
		this.init();
	}

	/**
	 * fires a request to create a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param body body of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public create(body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.postService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.post(body, options);
	}

	/**
	 * fires a request to read a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param id identifier of the resource
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public read(id : IdType, options? : OptionInterface) : Observable<T>
	{
		return this.getService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.get(id, options);
	}

	/**
	 * fires a request to find multiple resources
	 *
	 * @since 1.0.0
	 *
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public find(options? : OptionInterface) : Observable<T[]>
	{
		return this.getService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.find(options);
	}

	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param id identifier of the resource
	 * @param body body of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public update(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.putService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.put(id, body, options);
	}

	/**
	 * fires a request to partially update a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param id identifier of the resource
	 * @param body body of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public patch(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.patchService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.patch(id, body, options);
	}

	/**
	 * fires a request to delete a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param id identifier of the resource
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public delete(id : IdType, options? : OptionInterface) : Observable<T>
	{
		return this.deleteService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.delete(id, options);
	}

	/**
	 * fires a non-standard request
	 *
	 * @since 2.0.0
	 *
	 * @param method method of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T | T[]>
	{
		return this.requestService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.request(method, options);
	}
}
