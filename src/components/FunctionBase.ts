export interface Controls {
		rawdata: string;
		dashboard: boolean;
		nope: boolean;
		string: string;
	}

export interface Data{
	accounts: Account[];
	records: Record[];
	budgets: Budget[];
}

export interface Account {
	"type": string;
	"name": string;
	"category": string;
	"currency": string;
	"id": string;
}

export interface Budget {
	"name":string,
	"from":string,
	"to":string,
	"id":string,
	"frequency":number,
	"amount": number,
	"currency":string,
	"timeoftransfer"?:string,
	"timeperiod":{
		"from":string,
		"to":string,
		"on"?: string
	}
}
export interface Record {
	"date": string,
	"amount": number,
	"from": string,
	"to": string,
	"comments": string,
	"currency": string
}

export interface Balance {
	"account": string,
	"type": string,
	"amount": number
}
