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
		return this.clone().setParam('userId', userId).find();
	}

	/**
	 * clone the service
	 *
	 * @since 9.0.0
	 *
	 * @return {TestService} instance of the service
	 */

	protected clone() : TestService
	{
		return new TestService(this.injector);
	}
}
