import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { PatchService } from './patch.service';
import { OptionsInterface } from './common.interface';

@Injectable()
export class CrudService<T> extends CommonService
{
	protected constructor
	(
		protected deleteService : DeleteService<T>,
		protected getService : GetService<T>,
		protected postService : PostService<T>,
		protected putService : PutService<T>,
		protected patchService : PatchService<T>
	)
	{
		super();
		this.clear();
	}

	create(body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.postService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.post(body, options ? options : this.options);
	}

	read(id : string, options? : OptionsInterface) : Observable<T>
	{
		return this.getService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.get(id, options ? options : this.options);
	}

	update(id : string, body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.putService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.put(id, body, options ? options : this.options);
	}

	patch(id : string, body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.patchService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.patch(id, body, options ? options : this.options);
	}

	delete(id : string, options? : OptionsInterface) : Observable<T>
	{
		return this.deleteService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.delete(id, options ? options : this.options);
	}
}
