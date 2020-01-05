import { Subject } from 'rxjs';

export interface AbortInterface
{
	expiration : number;
	signal : Subject<void>;
}
