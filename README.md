NGX CRUD
========

> CRUD services in Angular with effortless aborting, caching and observing.

[![Build Status](https://img.shields.io/github/workflow/status/redaxmedia/ngx-crud/ci.svg)](https://github.com/redaxmedia/ngx-crud/actions?query=workflow:ci)
[![Coverage Status](https://coveralls.io/repos/github/redaxmedia/ngx-crud/badge.svg)](https://coveralls.io/github/redaxmedia/ngx-crud)
[![NPM Version](https://img.shields.io/npm/v/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![License](https://img.shields.io/npm/l/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)


Installation
------------

```
npm install ngx-crud
```


Setup
-----

Import the `CrudModule` and `HttpClientModule` inside your `AppModule`:

```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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


Usage
-----

Extend the `ExampleService` from the `CrudService`:

```typescript
import { Injectable } from '@angular/core';
import { CrudService } from 'ngx-crud';
import { RequestBody, ResponseBody } from './example.interface';

import { environment } from '@env';

@Injectable()
export class ExampleService extends CrudService<RequestBody, ResponseBody>
{
	protected apiUrl : string = environment.apiUrl;
	protected apiRoute : string = environment.apiRoutes.example;
}
```


Documentation
-------------

Read the [documenation](https://redaxmedia.gitbook.io/ngx-crud) for a deep dive.
