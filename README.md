NGX CRUD
========

> CRUD services in Angular with effortless aborting, batching and caching.

[![Build Status](https://img.shields.io/github/workflow/status/redaxmedia/ngx-crud/ci.svg)](https://github.com/redaxmedia/ngx-crud/actions?query=workflow:ci)
[![Mutation Status](https://badge.stryker-mutator.io/github.com/redaxmedia/ngx-crud/master)](https://github.com/redaxmedia/ngx-crud)
[![Coverage Status](https://coveralls.io/repos/github/redaxmedia/ngx-crud/badge.svg)](https://coveralls.io/github/redaxmedia/ngx-crud)
[![NPM Version](https://img.shields.io/npm/v/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![License](https://img.shields.io/npm/l/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![Article Medium](https://img.shields.io/badge/article-medium-0088cc.svg)](https://medium.com/@redaxmedia/crud-services-in-angular-with-effortless-aborting-and-caching-d92078967643)
[![Playground StackBlitz](https://img.shields.io/badge/playground-stackblitz-0088cc.svg)](https://stackblitz.com/github/redaxmedia/ngx-crud-playground)


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
import { CrudModule } from 'ngx-crud/core';

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
import { CrudService } from 'ngx-crud/core';
import { ExampleInterface } from './example.interface';

import { environment } from '@env';

@Injectable()
export class ExampleService extends CrudService<ExampleInterface>
{
	protected apiUrl : string = environment.apiUrl;
	protected endpoint : string = environment.routes.example;
}
```


Documentation
-------------

Read the [documenation](https://redaxmedia.gitbook.io/ngx-crud) for a deep dive.
