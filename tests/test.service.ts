import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../src';

import { TestInterface } from './test.interface';

@Injectable()
export class TestService extends CrudService<TestInterface>
{
	protected apiUrl : string = 'https://jsonplaceholder.typicode.com';
	protected endpoint : string = '/posts';

	findByUser(userId : string) : Observable<TestInterface[]>
	{
		return this.find(
		{
			params: this.getParams().set('userId', userId)
		});
	}
}
