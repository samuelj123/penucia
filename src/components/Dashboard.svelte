<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Controls, Data, Record, Budget, Balance } from "./FunctionBase";
	import {currencyCalc} from "./FunctionBase";
	export let data:Data;
	export let controls:Controls;

	const dispatch = createEventDispatcher();
	const reset = () => dispatch('call-reset');

	const accounts = data.accounts;
	const assets = accounts.filter(x => x.type === "asset");

	const Budgets = (budgets:Budget[]):Record[] => {
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

	const getBalancesOfAllAccounts = (records:Record[]) => {
		let returnobject:Balance[] = [];
		data.accounts.forEach(( asset ) => {
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

	const mergeAccountBalances = (obj1:Balance[],obj2:Balance[]) => {
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

	const checkIfBalanced = (records:Record[]) => {
		let result = 0;
		data.accounts.forEach(( asset ) => {
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

	const isBudgetSensible = (budgetrecs:Record[]) => {
		const balances = getBalancesOfAllAccounts(budgetrecs);
		const checking:Balance|string = balances.find(bal => bal.account == "Commonwealth Checking")||"Not Found";
		if (typeof(checking)=='string'){
			return false
		} 
		else {
			console.log(checking);
			return checking.amount>=0
		}
	}
</script>


<a href={controls.string} download="finance.json">Download</a>
<button on:click={reset}>Back</button>

<h3>List of Accounts</h3>
{#each mergeAccountBalances(getBalancesOfAllAccounts(data.records), getBalancesOfAllAccounts(Budgets(data.budgets))) as asset}
	<p>{asset.account} - {asset.type} {asset.amount1} {asset.amount2} {currencyCalc(asset.amount1 - asset.amount2)}</p>
{/each}

<h3>If Balanced {checkIfBalanced(data.records)}</h3>
<h3>Is Budget Sensible {isBudgetSensible(Budgets(data.budgets))}</h3>



<!-- <h3>Regular Transactions</h3> -->
<!-- {#each data.records as record} -->
<!-- 	<p>{record.date} {record.currency} {record.amount} {record.comments}</p> -->
<!-- {/each} -->

<!-- <h3>Budget Transactions</h3> -->
<!-- {#each Budgets(data.budgets) as budget} -->
<!-- 	<p>{budget.date} {budget.currency} {budget.amount} {budget.comments}</p> -->
<!-- {/each} -->
