export interface RequestBody
{
	title : string;
	body : string;
	userId : string;
}

export interface ResponseBody
{
	id : number;
	title : string;
	body : string;
	userId : string;
}

export interface Context
{
	before : boolean;
	after : boolean
}
