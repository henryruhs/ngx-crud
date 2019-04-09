NGX CRUD
========

> Fluent CRUD services for Angular.

[![Build Status](https://img.shields.io/travis/redaxmedia/ngx-crud.svg)](https://travis-ci.org/redaxmedia/ngx-crud)
[![Mutation Status](https://badge.stryker-mutator.io/github.com/redaxmedia/ngx-crud/master)](https://github.com/redaxmedia/ngx-crud)
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
import { CrudService } from 'ngx-crud';
import { Observable } from 'rxjs';
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

	deleteMany(body : any) : Observable<ExampleInterface[]>
	{
		return this.request('delete',
		{
			body
		});
	}
}
```


API
===


CRUD Service
------------

Overview of `CRUD` methods:

| Operation | HTTP   | Method  | Parameter                                                      | Return                |
|-----------|--------|---------|----------------------------------------------------------------|-----------------------|
| Create    | POST   | create  | `body : any, options? : OptionInterface`                       | `Observable<T>`       |
| Read      | GET    | read    | `id : number / string, options? : OptionInterface`             | `Observable<T>`       |
| Find      | GET    | find    | `options? : OptionInterface`                                   | `Observable<T[]>`     |
| Update    | PUT    | update  | `id : number / string, body : any, options? : OptionInterface` | `Observable<T>`       |
| Patch     | PATCH  | patch   | `id : number / string, body : any, options? : OptionInterface` | `Observable<T>`       |
| Delete    | DELETE | delete  | `id : number / string, options? : OptionInterface`             | `Observable<T>`       |
| Request   | ANY    | request | `method : MethodType, options? : OptionWithBodyInterface`      | `Observable<T / T[]>` |


Common Service
--------------

Overview of `get` methods:

| Method             | Return            |
|--------------------|-------------------|
| getApiUrl          | `string`          |
| getEndpoint        | `string`          |
| getOptions         | `OptionInterface` |
| getHeaders         | `HttpHeaders`     |
| getParams          | `HttpParams`      |
| getReportProgress  | `boolean`         |
| getWithCredentials | `boolean`         |

Overview of `set` methods:

| Method             | Parameter                    | Return |
|--------------------|------------------------------|--------|
| setApiUrl          | `apiUrl : string`            | `this` |
| setEndpoint        | `endpoint : string`          | `this` |
| setOptions         | `options : OptionInterface`  | `this` |
| setHeaders         | `headers : HttpHeaders`      | `this` |
| setParams          | `params : HttpParams`        | `this` |
| setReportProgress  | `reportProgress : boolean`   | `this` |
| setWithCredentials | `withCredentials :  boolean` | `this` |

Overview of `clear` methods:

| Method               | Return |
|----------------------|--------|
| clearOptions         | `this` |
| clearHeaders         | `this` |
| clearParams          | `this` |
| clearReportProgress  | `this` |
| clearWithCredentials | `this` |

Overview of `misc` methods:

| Method    | Parameter                                                   | Return   |
|-----------|-------------------------------------------------------------|----------|
| init      |                                                             | `this`   |
| createURL | `apiUrl : string, endpoint : string, id? : number / string` | `string` |
