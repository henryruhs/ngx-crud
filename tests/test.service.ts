import { Injectable } from '@angular/core';
import { CrudService } from '../';

import { TestInterface } from './test.interface';

@Injectable()
export class TestService extends CrudService<TestInterface>
{
	protected apiUrl : string = 'https://jsonplaceholder.typicode.com';
	protected endpoint : string = 'posts';
}
