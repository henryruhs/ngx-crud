import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../src';
import { TestInterface } from './test.interface';

@Injectable()
export class TestService extends CrudService<TestInterface>
{
	protected apiUrl : string = 'https://jsonplaceholder.typicode.com';
	protected endpoint : string = '/posts';

	constructor(injector : Injector)
	{
		super(injector);
		this.init();
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
