import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl, ApiRoute, CrudService } from '../src';
import { RequestBody, ResponseBody } from './test.interface';

@Injectable()
@ApiUrl('https://jsonplaceholder.typicode.com')
@ApiRoute('/posts')
export class TestService extends CrudService<RequestBody, ResponseBody>
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
	 * @return {Observable<ResponseBody[]>} http response
	 */

	findByUser(userId : string) : Observable<ResponseBody[]>
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
