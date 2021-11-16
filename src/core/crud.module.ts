import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AbortInterceptor } from '../abort';
import { AbortService } from '../abort';
import { CacheInterceptor } from '../cache';
import { CacheService } from '../cache';
import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { ReadService } from './read.service';
import { ObserveInterceptor } from '../observe';
import { ObserveService } from '../observe';
import { PatchService } from './patch.service';
import { CreateService } from './create.service';
import { UpdateService } from './update.service';
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
		CacheService,
		DeleteService,
		FindService,
		ReadService,
		ObserveService,
		PatchService,
		CreateService,
		UpdateService,
		RequestService
	]
})
export class CrudModule
{
}
