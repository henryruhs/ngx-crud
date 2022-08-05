import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AbortInterceptor } from './abort.interceptor';
import { AbortService } from './abort.service';

@NgModule(
{
	providers:
	[
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: AbortInterceptor
		},
		AbortService
	]
})
export class AbortModule
{
}
