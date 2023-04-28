import { NgModule } from '@angular/core';

import { AbortModule } from '../abort';
import { CacheModule } from '../cache';
import { ObserveModule } from '../observe';

import { DeleteService } from './delete.service';
import { FindService } from './find.service';
import { ReadService } from './read.service';
import { PatchService } from './patch.service';
import { CreateService } from './create.service';
import { UpdateService } from './update.service';
import { CustomService } from './custom.service';

@NgModule(
{
	imports:
	[
		AbortModule,
		CacheModule,
		ObserveModule
	],
	providers:
	[
		CreateService,
		ReadService,
		FindService,
		UpdateService,
		PatchService,
		DeleteService,
		CustomService
	]
})
export class CrudModule
{
}
