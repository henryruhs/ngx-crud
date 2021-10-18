export interface Test
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
