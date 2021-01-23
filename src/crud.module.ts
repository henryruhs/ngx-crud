import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AbortInterceptor } from './abort.interceptor';
import { AbortService } from './abort.service';
import { BatchService } from './batch.service';
import { CacheInterceptor } from './cache.interceptor';
import { CacheService } from './cache.service';
import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { GetService } from './get.service';
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
		AbortService,
		BatchService,
		CacheService,
		DeleteService,
		FindService,
		GetService,
		PatchService,
		PostService,
		PutService,
		RequestService
	]
})
export class CrudModule
{
}
