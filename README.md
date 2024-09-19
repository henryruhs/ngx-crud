NGX CRUD
========

> CRUD services in Angular with effortless aborting, caching and observing.

[![Build Status](https://img.shields.io/github/actions/workflow/status/henryruhs/ngx-crud/ci.yml.svg?branch=master)](https://github.com/henryruhs/ngx-crud/actions?query=workflow:ci)
[![Coverage Status](https://img.shields.io/coveralls/henryruhs/ngx-crud.svg)](https://coveralls.io/r/henryruhs/ngx-crud)
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

import { environment } from '@environments';

@Injectable()
@ApiUrl(environment.apiUrl)
@ApiRoute(environment.apiRoutes.example)
export class ExampleService extends CrudService<RequestBody, ResponseBody>
{
}
```

Use the HTTP operations as needed:

```typescript
exampleService.create(body, options);
exampleService.read(id, options);
exampleService.find(options);
exampleService.update(id, body, options);
exampleService.patch(id, body, options);
exampleService.delete(id, options);
exampleService.custom(method, options);
```


Documentation
-------------

Read the [documentation](https://henryruhs.gitbook.io/ngx-crud) for a deep dive.
