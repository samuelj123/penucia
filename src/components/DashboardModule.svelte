<script lang="ts" context="module">
	import type { Account, Record, Budget, Balance } from "./FunctionBase";
	import { currencyCalc } from "./FunctionBase";

	export const MakeBudgetRecords = (budgets:Budget[]):Record[] => {
		let record:Record[] = [];
		budgets.forEach((budget)=>{
			if (budget.timeperiod.on) {
				record.push({
					"date": new Date(budget.timeperiod.on).toLocaleDateString(),
					"amount": budget.amount,
					"from": budget.from,
					"to": budget.to,
					"currency": budget.currency,
					"comments": "B::"+budget.name
				});
			} else {
				var budgetEndDateString = budget.timeperiod.to.replace(/-/g,'/');  // replaces all occurances of "-" with "/")
				const budgetenddate:Date = new Date(budgetEndDateString);
				const today = new Date();
				const recordenddate = budgetenddate>today?today:budgetenddate;

				const ttfrom:Date = new Date(budget.timeperiod.from);
				for(var d = ttfrom; d <= recordenddate; d.setDate(d.getDate() + budget.frequency)) {
					record.push({
						"date": d.toLocaleDateString(),
						"amount": budget.amount,
						"from": budget.from,
						"to": budget.to,
						"currency": budget.currency,
						"comments": "B::"+budget.name
					})
				}
			}
		});
		return record;
	}


	export const mergeAccountBalances = (obj1:Balance[],obj2:Balance[]) => {
		let mergedObjects=[];
		for (const obj of obj1) {
			const mergedObj = {"currency": obj.currency, "account":obj.accountname,"type":obj.type,"amount1":obj.amount,"amount2":0}
			const matchObj = obj2.find(o => o.account ===obj.account);
			if(matchObj) {
				mergedObj.amount2=matchObj.amount;
			}
			mergedObjects.push(mergedObj);
		}
		return mergedObjects;
	}

	export const getBalancesOfAllAccounts = (records:Record[],accounts:Account[]) => {
		let returnobject:Balance[] = [];
		accounts.forEach(( asset ) => {
			let counter = 0;
			records.forEach(( record ) => {
				if (asset.id == record.to) {
					counter = currencyCalc(counter + record.amount);
				} else if (asset.id == record.from) {
					counter = currencyCalc(counter - record.amount);
				} 
			});
			returnobject.push({"account":asset.id, "accountname":asset.name, "currency":asset.currency, "type":asset.type, "amount":counter});
		});
		return returnobject;
	};

	export const checkIfBalanced = (records:Record[], accounts:Account[]) => {
		let result = 0;
		accounts.forEach(( asset ) => {
			let counter = 0;
			records.forEach(( record ) => {
				if (asset.id == record.to) {
					counter = currencyCalc(counter + record.amount);
				} else if (asset.id == record.from) {
					counter = currencyCalc(counter - record.amount);
				} 
			});
			result=currencyCalc(result+counter);
		});
		return result;
	}

	export const isBudgetSensible = (budgetrecs:Record[], accounts:Account[]) => {
		const balances = getBalancesOfAllAccounts(budgetrecs,accounts);
		const checking:Balance|string = balances.find(bal => bal.account == "commwealthchecking")||"Not Found";
		if (typeof(checking)=='string'){
			return false
		} 
		else {
			return checking.amount>=0
		}
	}

	export const IncomeVsExpenses = (bal:Balance[]):number => {
		let income = 0;
		let expenses = 0;
		bal.forEach(bal => {
			bal.type=="income"?income+=currencyCalc(bal.amount):0;
			bal.type=="expense"?expenses+=currencyCalc(bal.amount):0;
		});
		return currencyCalc(income+expenses);
	}

	export const SevenDaysAgo = (rec:Record) => {
		let sdago = new Date();
		sdago.setDate(sdago.getDate() - 7);
		return sdago <=new Date(rec.date) && new Date(rec.date) <= new Date();
	}
</script>
