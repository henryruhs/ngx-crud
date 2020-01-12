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
		this.deleteService = injector.get(DeleteService);
		this.getService = injector.get(GetService);
		this.patchService = injector.get(PatchService);
		this.postService = injector.get(PostService);
		this.putService = injector.get(PutService);
		this.requestService = injector.get(RequestService);
		this.init();
	}

	public create(body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.postService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.post(body, options);
	}

	public read(id : IdType, options? : OptionInterface) : Observable<T>
	{
		return this.getService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.get(id, options);
	}

	public find(options? : OptionInterface) : Observable<T[]>
	{
		return this.getService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.find(options);
	}

	public update(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.putService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.put(id, body, options);
	}

	public patch(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.patchService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.patch(id, body, options);
	}

	public delete(id : IdType, options? : OptionInterface) : Observable<T>
	{
		return this.deleteService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.delete(id, options);
	}

	public request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T | T[]>
	{
		return this.requestService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.request(method, options);
	}
}
