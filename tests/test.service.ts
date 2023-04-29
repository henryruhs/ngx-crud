import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiUrl, ApiRoute, CrudService } from '../src';

import { RequestBody, ResponseBody } from './test.interface';

@Injectable()
@ApiUrl('https://jsonplaceholder.typicode.com')
@ApiRoute('/posts')
export class TestService extends CrudService<RequestBody, ResponseBody>
{
	findByUser(userId : string) : Observable<ResponseBody[]>
	{
		return this.clone().setParam('userId', userId).find();
	}
}
