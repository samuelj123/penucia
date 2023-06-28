<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Controls, Data, Record, Budget, Balance } from "./FunctionBase";
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
					counter = counter + record.amount;
				} else if (asset.id == record.from) {
					counter = counter - record.amount;
				} 
			});
			returnobject.push({"account":asset.name, "amount":counter});
		});
		console.log(returnobject);
		return returnobject;
	};
</script>


<a href={controls.string} download="finance.json">Download</a>
<button on:click={reset}>Back</button>

<h3>List of Accounts</h3>
{#each getBalancesOfAllAccounts(data.records) as asset}
	<p>{asset.account}</p>
	<p>{asset.amount}</p>
{/each}
	
<h3>Regular Transactions</h3>
{#each data.records as record}
	<p>{record.date} {record.currency} {record.amount} {record.comments}</p>
{/each}

<h3>Budget Transactions</h3>
{#each Budgets(data.budgets) as budget}
	<p>{budget.date} {budget.currency} {budget.amount} {budget.comments}</p>
{/each}
