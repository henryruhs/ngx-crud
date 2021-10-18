import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl, ApiRoute, CrudService } from '../src';
import { Test } from './test.interface';

@Injectable()
@ApiUrl('https://jsonplaceholder.typicode.com')
@ApiRoute('/posts')
export class TestService extends CrudService<Test>
{
	constructor(injector : Injector)
	{
		super(injector);
	}

	/**
	 * find by user
	 *
	 * @since 2.0.0
	 *
	 * @param {string} userId identifier of the user
	 *
	 * @return {Observable<Test[]>} http response
	 */

	public findByUser(userId : string) : Observable<Test[]>
	{
		return this.setParam('userId', userId).find();
	}
}
