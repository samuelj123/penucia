export interface Controls {
		rawdata: string;
		dashboard: boolean;
		nope: boolean;
		string: string;
	}

export interface Data{
	accounts: Account[];
	records: object[];
	budgets: object[];
}

interface Account {
	"type": string;
	"name": string;
	"category": string;
	"currency": string;
}
