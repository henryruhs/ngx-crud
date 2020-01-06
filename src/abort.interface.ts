import { Subject } from 'rxjs';

export interface AbortInterface
{
	timeout : NodeJS.Timeout;
	signal : Subject<void>;
}
