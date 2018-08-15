import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { PatchService } from './patch.service';

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

	create(id : string, body : any, options? : any) : Observable<HttpEvent<T>>
	{
		return this.postService.post(id, body, options ? options : this.options);
	}

	read(id : string, options? : any) : Observable<HttpEvent<T[]>>
	{
		return this.getService.get(id, options ? options : this.options);
	}

	update(id : string, body : any, options? : any) : Observable<HttpEvent<T>>
	{
		return this.putService.put(id, body, options ? options : this.options);
	}

	patch(id : string, body : any, options? : any) : Observable<HttpEvent<T>>
	{
		return this.patchService.patch(id, body, options ? options : this.options);
	}

	delete(id : string, options? : any) : Observable<HttpEvent<T>>
	{
		return this.deleteService.delete(id, options ? options : this.options);
	}
}
