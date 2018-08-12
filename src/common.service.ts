import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService
{
	public apiUrl : string;
	public endpoint : string;

	constructor(protected http : HttpClient)
	{
	}
}