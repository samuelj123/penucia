<script lang="ts" context="module">
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
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Controls, Account, Data, Record, Budget, Balance } from "./FunctionBase";
	import { currencyCalc } from "./FunctionBase";
	import GeneralLayout from "./GeneralLayout.svelte";
	import AccountsLayout from "./AccountsLayout.svelte";
	import BudgetsLayout from "./BudgetsLayout.svelte";

	export let data:Data;
	export let controls:Controls;

	const dispatch = createEventDispatcher();
	const reset = () => dispatch('call-reset');

	let toggle = "dashboard";
	const Toggleaccounts = () => toggle = "accounts";
	const Togglebudgets = () => toggle = "budgets";
	const Toggledashboard = () => toggle = "dashboard";




	export const checkIfBalanced = (records:Record[]) => {
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

	export const isBudgetSensible = (budgetrecs:Record[]) => {
		const balances = getBalancesOfAllAccounts(budgetrecs, data.accounts);
		const checking:Balance|string = balances.find(bal => bal.account == "Commonwealth Checking")||"Not Found";
		if (typeof(checking)=='string'){
			return false
		} 
		else {
			return checking.amount>=0
		}
	}

</script>

<nav>
	<button on:click={Toggleaccounts}>Accounts</button>
	<button on:click={Togglebudgets}>Budgets</button>
	<button on:click={Toggledashboard}>Dashboard</button>
	<a href={controls.string} download="finance.json">Download</a>
	<button on:click={reset}>Exit</button>
</nav>


{#if toggle==="dashboard"}
	<GeneralLayout data={data} />
	{:else if toggle === "accounts"} 
	<AccountsLayout data={data}/>
	{:else if toggle === "budgets"} 
	<BudgetsLayout data={data}/>
{/if}


<h3>If Balanced {checkIfBalanced(data.records)}</h3>
<h3>Is Budget Sensible {isBudgetSensible(Budgets(data.budgets))}</h3>
