import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ObserveInterceptor } from './observe.interceptor';
import { ObserveService } from './observe.service';

@NgModule(
{
	providers:
	[
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: ObserveInterceptor
		},
		ObserveService
	]
})
export class ObserveModule
{
}
