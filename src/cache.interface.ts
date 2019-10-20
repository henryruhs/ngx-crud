import { HttpResponse } from '@angular/common/http';

export interface CacheInterface
{
	expiration: number;
	response: HttpResponse<any>;
	url: string;
}
