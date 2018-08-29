NGX CRUD
========

> Fluent CRUD services for Angular.

[![Build Status](https://img.shields.io/travis/redaxmedia/ngx-crud.svg)](https://travis-ci.org/redaxmedia/ngx-crud)
[![NPM Version](https://img.shields.io/npm/v/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![License](https://img.shields.io/npm/l/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)


Installation
------------

```
npm install ngx-crud
```


Usage
-----

Import the `CrudModule` and `HttpClientModule` to `AppModule`:

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CrudModule } from 'ngx-crud';

@NgModule(
{
	imports:
	[
		CrudModule,
		HttpClientModule
	]
})
export class AppModule
{
}
```

Extend `ExampleService` from `CrudService`:

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from 'ngx-crud';
import { ExampleInterface } from './example.interface';

import { environment } from '@env';

@Injectable()
export class ExampleService extends CrudService<ExampleInterface>
{
	protected apiUrl : string = environment.apiUrl;
	protected endpoint : string = environment.routes.example;

	findByFilter(filter : string) : Observable<ExampleInterface[]>
	{
		return this.find(
		{
			params: this.getParams().set('filter', filter)
		});
	}
}
```


API
---

| Operation | HTTP   | Method | Parameter                                                      | Return            |
|-----------|--------|--------|----------------------------------------------------------------|-------------------|
| Create    | POST   | create | `body : any, options? : OptionInterface`                       | `Observable<T>`   |
| Read      | GET    | read   | `id : number / string, options? : OptionInterface`             | `Observable<T>`   |
| Find      | GET    | find   | `options? : OptionInterface`                                   | `Observable<T[]>` |
| Update    | PUT    | update | `id : number / string, body : any, options? : OptionInterface` | `Observable<T>`   |
| Patch     | PATCH  | patch  | `id : number / string, body : any, options? : OptionInterface` | `Observable<T>`   |
| Delete    | DELETE | delete | `id : number / string, options? : OptionInterface`             | `Observable<T>`   |


