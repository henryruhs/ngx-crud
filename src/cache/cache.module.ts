import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheInterceptor } from './cache.interceptor';
import { CacheService } from './cache.service';

@NgModule(
{
	providers:
	[
		CacheService,
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor
		}
	]
})
export class CacheModule
{
}
