import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService, Options, OptionsWithBody, Id, Method } from '../common';
import { CreateService } from './create.service';
import { ReadService } from './read.service';
import { FindService } from './find.service';
import { UpdateService } from './update.service';
import { PatchService } from './patch.service';
import { DeleteService } from './delete.service';
import { CustomService } from './custom.service';
import { Crud } from './crud.interface';
import { NoInfer } from './crud.type';

@Injectable()
export class CrudService<
	RequestBody,
	ResponseBody,
	CreateRequestBody = RequestBody,
	CreateResponseBody = ResponseBody,
	ReadResponseBody = ResponseBody,
	FindResponseBody = ResponseBody[],
	UpdateRequestBody = RequestBody,
	UpdateResponseBody = ResponseBody,
	PatchRequestBody = Partial<RequestBody>,
	PatchResponseBody = ResponseBody,
	DeleteResponseBody = ResponseBody,
	CustomRequestBody = RequestBody,
	CustomResponseBody = ResponseBody | ResponseBody[]
> extends CommonService implements Crud<
	CreateRequestBody,
	CreateResponseBody,
	ReadResponseBody,
	FindResponseBody,
	UpdateRequestBody,
	UpdateResponseBody,
	PatchRequestBody,
	PatchResponseBody,
	DeleteResponseBody,
	CustomRequestBody,
	CustomResponseBody
>
{
	protected createService : CreateService<CreateRequestBody, CreateResponseBody> = this.injector.get(CreateService);
	protected readService : ReadService<ReadResponseBody> = this.injector.get(ReadService);
	protected findService : FindService<FindResponseBody> = this.injector.get(FindService);
	protected updateService : UpdateService<UpdateRequestBody, UpdateResponseBody> = this.injector.get(UpdateService);
	protected patchService : PatchService<PatchRequestBody, PatchResponseBody> = this.injector.get(PatchService);
	protected deleteService : DeleteService<DeleteResponseBody> = this.injector.get(DeleteService);
	protected customService : CustomService<CustomRequestBody, CustomResponseBody> = this.injector.get(CustomService);

	create<
		RequestBody = CreateRequestBody,
		ResponseBody = CreateResponseBody
	>(body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.createService.bind(this).create(body, options);
	}

	read<
		ResponseBody = ReadResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	{
		return this.readService.bind(this).read(id, options);
	}

	find<
		ResponseBody = FindResponseBody
	>(options ?: Options) : Observable<ResponseBody>
	{
		return this.findService.bind(this).find(options);
	}

	update<
		RequestBody = UpdateRequestBody,
		ResponseBody = UpdateResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.updateService.bind(this).update(id, body, options);
	}

	patch<
		RequestBody = PatchRequestBody,
		ResponseBody = PatchResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.patchService.bind(this).patch(id, body, options);
	}

	delete<
		ResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	{
		return this.deleteService.bind(this).delete(id, options);
	}

	custom<
		RequestBody = CustomRequestBody,
		ResponseBody = CustomResponseBody
	>(method : Method, options ?: OptionsWithBody<NoInfer<RequestBody>>) : Observable<ResponseBody>
	{
		return this.customService.bind(this).custom(method, options);
	}
}
