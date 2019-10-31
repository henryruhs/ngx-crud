import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CacheInterface
{
	expiration: number;
	response: Observable<HttpResponse<any>>;
	url: string;
}
