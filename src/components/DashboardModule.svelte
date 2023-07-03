<script lang="ts" context="module">
	import type { Account, Record, Budget, Balance } from "./FunctionBase";
	import { currencyCalc } from "./FunctionBase";

	export const Budgets = (budgets:Budget[]):Record[] => {
		let record:Record[] = [];
		budgets.forEach((budget)=>{
			// const tto:Date = new Date(budget.timeperiod.to);
			const ttfrom:Date = new Date(budget.timeperiod.from);
			const today = new Date();
			for(var d = ttfrom; d <= today; d.setDate(d.getDate() + budget.frequency)) {
				record.push({
					"date": d.toLocaleDateString(),
					"amount": budget.amount,
					"from": budget.from,
					"to": budget.to,
					"currency": budget.currency,
					"comments": "B::"+budget.name
				})
			}
		});
		return record;
	}

	export const mergeAccountBalances = (obj1:Balance[],obj2:Balance[]) => {
		let mergedObjects=[];
		for (const obj of obj1) {
			const mergedObj = {"account":obj.account,"type":obj.type,"amount1":obj.amount,"amount2":0}
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
			returnobject.push({"account":asset.name, "type":asset.type, "amount":counter});
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
		const checking:Balance|string = balances.find(bal => bal.account == "Commonwealth Checking")||"Not Found";
		if (typeof(checking)=='string'){
			return false
		} 
		else {
			return checking.amount>=0
		}
	}
</script>
