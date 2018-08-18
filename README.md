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
import { CrudService } from 'ngx-crud';
import { ExampleInterface } from './example.interface';

import { environment } from '@env';

@Injectable()
export class ExampleService extends CrudService<ExampleInterface>
{
	protected apiUrl : string = environment.apiUrl;
	protected endpoint : string = environment.routes.example;
}
```


API
---

| Operation | HTTP   | Method                                                          |
|-----------|--------|--------------------------------------------------------------|
| Create    | POST   | create(body : any, options? : OptionsInterface)              |
| Read      | GET    | read(id : string, options? : OptionsInterface)               |
| Update    | PUT    | update(id : string, body : any, options? : OptionsInterface) |
| Patch     | PATCH  | patch(id : string, body : any, options? : OptionsInterface)  |
| Delete    | DELETE | delete(id : string, options? : OptionsInterface)             |