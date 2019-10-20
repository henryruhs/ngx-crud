import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheInterceptor } from './cache.interceptor';
import { CacheService } from './cache.service';
import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { PatchService } from './patch.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { RequestService } from './request.service';

@NgModule(
{
	providers:
	[
		CacheService,
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor
		},
		DeleteService,
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
