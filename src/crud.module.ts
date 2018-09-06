import { NgModule } from '@angular/core';
import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { PatchService } from './patch.service';

@NgModule(
{
	providers:
	[
		DeleteService,
		GetService,
		PatchService,
		PostService,
		PutService
	]
})
export class CrudModule
{
}