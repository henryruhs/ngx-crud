import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CacheInterface
{
	response : Observable<HttpResponse<any>>;
	timeout : NodeJS.Timeout;
}
