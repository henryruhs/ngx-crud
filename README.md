NGX CRUD
========

> CRUD services in Angular with effortless aborting, batching and caching.

[![Build Status](https://img.shields.io/github/workflow/status/redaxmedia/ngx-crud/ci.svg)](https://github.com/redaxmedia/ngx-crud/actions?query=workflow:ci)
[![Mutation Status](https://badge.stryker-mutator.io/github.com/redaxmedia/ngx-crud/master)](https://github.com/redaxmedia/ngx-crud)
[![Coverage Status](https://coveralls.io/repos/github/redaxmedia/ngx-crud/badge.svg)](https://coveralls.io/github/redaxmedia/ngx-crud)
[![NPM Version](https://img.shields.io/npm/v/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![License](https://img.shields.io/npm/l/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![Medium Article](https://img.shields.io/badge/medium-article-0088cc.svg)](https://medium.com/@redaxmedia/crud-services-in-angular-with-effortless-aborting-and-caching-d92078967643)


Installation
------------

```
npm install ngx-crud
```


Usage
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
Extend the `ExampleService` from the `CrudService`:

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
===


HTTP Operations
---------------

Fires a `POST` request to create a single resource:

```typescript
crudService->create(body : BodyInterface, options? : OptionInterface) : Observable<T>
```

Fires a `GET` request to read a single resource:

```typescript
crudService->read(id : IdType, options? : OptionInterface) : Observable<T>
```

Fires a `GET` request to find multiple resources:

```typescript
crudService->find(options? : OptionInterface) : Observable<T[]>
```

Fires a `PUT` request to completely update a single resource:

```typescript
crudService->update(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
```

Fires a `PATCH` request to partially update a single resource:

```typescript
crudService->patch(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
```

Fires a `DELETE` request to delete a single resource:

```typescript
crudService->delete(id : IdType, options? : OptionInterface) : Observable<T>
```

Fires a non-standard request:

```typescript
crudService->request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T | T[]>
```


HTTP Aborting
-------------

Enable aborting for the service:

```typescript
crudService->enableAbort(method : MethodType = 'GET', lifetime : number = 2000) : this
```

Disable aborting for the service:

```typescript
crudService->disableAbort() : this
```

Abort all requests of the service:

```typescript
crudService->abort() : this
```

Abort a single request by its `urlWithParams` for enabled services:

```typescript
abortService->abort(urlWithParams : string) : this
```

Abort many requests by their `url` for enabled services:

```typescript
abortService->abortMany(url : string) : this
```

Abort all requests for enabled services:

```typescript
abortService->abortAll() : this
```

Observe all requests for enabled services:

```typescript
abortService->observeAll() : Observable<[string, AbortInterface]>
```


HTTP Batching
-------------

Fires multiple requests in parallel:

```typescript
crudService->parallel(requestArray : ObservableInput<T>[]) : Observable<T[]>
```


HTTP Caching
------------

Enable caching for the service:

```typescript
crudService->enableCache(method : MethodType = 'GET', lifetime : number = 2000) : this
```

Disable caching for the service:

```typescript
crudService->disableCache() : this
```

Flush all caches of the service:

```typescript
crudService->flush() : this
```

Flush a single cache by its `urlWithParams` for enabled services:

```typescript
cacheService->flush(urlWithParams : string) : this
```

Flush many caches by their `url` for enabled services:

```typescript
cacheService->flushMany(url : string) : this
```

Flush all caches for enabled services:

```typescript
cacheService->flushAll() : this
```

Observe all caches for enabled services:

```typescript
cacheService->observeAll() : Observable<[string, CacheInterface]>
```


Service Shorthands
------------------

Clear the service:

```typescript
crudService->clear()
```

Destroy the service:

```typescript
crudService->destroy()
```


Service Options
---------------

Get the API URL of the service:

```typescript
crudService->getApiUrl() : string
```

Set the API URL of the service:

```typescript
crudService->setApiUrl(apiUrl : string) : this
```

Get the endpoint of the service:

```typescript
crudServie->getEndpoint() : string
```

Set the endpoint of the service:

```typescript
crudService->setEndpoint(endpoint : string) : this
```


HTTP Options
------------

Get a single option of the service:

```typescript
crudService->getOption<K extends keyof OptionInterface>(name : K) : OptionInterface[K]
```

Get the options of the service:

```typescript
crudService->getOptions() : OptionInterface
```

Set a single option of the service:

```typescript
crudService->setOption<K extends keyof OptionInterface>(name : K, value : OptionInterface[K]) : this
```

Set the options of the service:

```typescript
crudService->setOptions(options : OptionInterface) : this
```

Clear a single option of the service:

```typescript
crudService->clearOption<K extends keyof OptionInterface>(name : K) : this
```

Clear the options of the service:

```typescript
crudService->clearOptions() : this
```


HTTP Headers
------------

Get a single header of the service:

```typescript
crudService->getHeader(name : string) : string
```

Get the headers instance of the service:

```typescript
crudService->getHeaders() : HttpHeaders
```

Get values for a single header of the service:

```typescript
crudService->getHeaderArray(name : string) : string[]
```

Set a single header of the service:

```typescript
crudService->setHeader(name : string, value : string) : this
```

Set the headers instance of the service:

```typescript
crudService->setHeaders(headers : HttpHeaders) : this
```

Set values for a single header of the service:

```typescript
crudService->setHeaderArray(name : string, valueArray : string[]) : this
```

Append a single header to the service:

```typescript
crudService->appendHeader(name : string, value : string) : this
```

Append values to a single header of the service:

```typescript
crudService->appendHeaderArray(name : string, valueArray : string[]) : this
```

Clear a single header of the service:

```typescript
crudService->clearHeader(name : string) : this
```

Clear the headers instance of the service:

```typescript
crudService->clearHeaders() : this
```


HTTP Params
-----------

Get a single parameter of the service:

```typescript
crudService->getParam(name : string) : string
```

Get the parameters instance of the service:

```typescript
crudService->getParams() : HttpParams
```

Get values for a single parameter of the service:

```typescript
crudService->getParamArray(name : string) : string[]
```

Set a single parameter of the service:

```typescript
crudService->setParam(name : string, value : string) : this
```

Set the parameters instance of the service:

```typescript
crudService->setParams(params : HttpParams) : this
```

Set values for a single parameter of the service:

```typescript
crudService->setParamArray(name : string, valueArray : string[]) : this
```

Append a single parameter to the service:

```typescript
crudService->appendParam(name : string, value : string) : this
```

Append values to a single parameter of the service:

```typescript
crudService->appendParamArray(name : string, valueArray : string) : this
```

Clear a single parameter of the service:

```typescript
crudService->clearParam(name : string) : this
```

Clear the parameters instance of the service:

```typescript
crudService->clearParams() : this
```


Helpers
-------

```typescript
createUrl(apiUrl : string, endpoint : string, id? : number | string) : string
```
