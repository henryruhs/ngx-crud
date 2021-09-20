import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl, Endpoint, CrudService } from '../src';
import { TestInterface } from './test.interface';

@Injectable()
@ApiUrl('https://jsonplaceholder.typicode.com')
@Endpoint('/posts')
export class TestService extends CrudService<TestInterface>
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
	 * @param userId identifier of the user
	 *
	 * @return http response as observable
	 */

	public findByUser(userId : string) : Observable<TestInterface[]>
	{
		return this.setParam('userId', userId).find();
	}
}
