import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { PostService } from './post.service';
import { PutService } from './put.service';

@Injectable()
export class CrudService extends DeleteService, GetService, PostService, PutService
{
	public create(id : string, body : any) : Observable<Response>
	{
		return this.post(id, body);
	}

	public read(id : string) : Observable<Response>
	{
		return this.get(id);
	}

	public update(id : string, body : any) : Observable<Response>
	{
		return this.put(id, body);
	}
}
