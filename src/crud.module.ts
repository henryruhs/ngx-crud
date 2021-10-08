import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AbortInterceptor } from './abort';
import { AbortService } from './abort';
import { ParallelService } from './parallel.service';
import { CacheInterceptor } from './cache/cache.interceptor';
import { CacheService } from './cache/cache.service';
import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { GetService } from './get.service';
import { ObserveInterceptor } from './observe/observe.interceptor';
import { ObserveService } from './observe/observe.service';
import { PatchService } from './patch.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { RequestService } from './request.service';

@NgModule(
{
	providers:
	[
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: AbortInterceptor
		},
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor
		},
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: ObserveInterceptor
		},
		AbortService,
		ParallelService,
		CacheService,
		DeleteService,
		FindService,
		GetService,
		ObserveService,
		PatchService,
		PostService,
		PutService,
		RequestService
	]
})
export class CrudModule
{
}
