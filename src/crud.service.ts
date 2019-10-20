import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { MethodType } from './method.type';
import { OptionInterface, OptionWithBodyInterface } from './option.interface';
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
		this.deleteService = injector.get<any>(DeleteService);
		this.getService = injector.get<any>(GetService);
		this.patchService = injector.get<any>(PatchService);
		this.postService = injector.get<any>(PostService);
		this.putService = injector.get<any>(PutService);
		this.requestService = injector.get<any>(RequestService);
		this.init();
	}

	public create(body : any, options? : OptionInterface) : Observable<T>
	{
		return this.postService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.post(body, options);
	}

	public read(id : number | string, options? : OptionInterface) : Observable<T>
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

	public update(id : number | string, body : any, options? : OptionInterface) : Observable<T>
	{
		return this.putService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.put(id, body, options);
	}

	public patch(id : number | string, body : any, options? : OptionInterface) : Observable<T>
	{
		return this.patchService
			.setApiUrl(this.getApiUrl())
			.setEndpoint(this.getEndpoint())
			.setOptions((this.getOptions()))
			.patch(id, body, options);
	}

	public delete(id : number | string, options? : OptionInterface) : Observable<T>
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
