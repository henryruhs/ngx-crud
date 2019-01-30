import { NgModule } from '@angular/core';
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
		DeleteService,
		GetService,
		PatchService,
		PostService,
		PutService,
		RequestService,
	],
})
export class CrudModule
{
}
