import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AbortInterceptor } from './abort.interceptor';
import { AbortService } from './abort.service';

@NgModule(
{
	providers:
	[
		AbortService,
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: AbortInterceptor
		}
	]
})
export class AbortModule
{
}
