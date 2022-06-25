import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AbortInterceptor, AbortService } from '../abort';
import { CacheInterceptor, CacheService } from '../cache';
import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { ReadService } from './read.service';
import { ObserveInterceptor, ObserveService } from '../observe';
import { PatchService } from './patch.service';
import { CreateService } from './create.service';
import { UpdateService } from './update.service';
import { CustomService } from './custom.service';

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
		CacheService,
		DeleteService,
		FindService,
		ReadService,
		ObserveService,
		PatchService,
		CreateService,
		UpdateService,
		CustomService
	]
})
export class CrudModule
{
}
