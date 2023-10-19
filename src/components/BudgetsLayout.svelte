<script lang="ts">
	import type {Data} from './FunctionBase';
	import { MakeBudgetRecords } from './DashboardModule.svelte';
	export let data:Data;

	let filterer:string;

	const budgetRecords = MakeBudgetRecords(data.budgets)
	.sort((a,b) => 
		new Date(a.date).getTime()-new Date(b.date).getTime()
	);

	$:budgetList = filterer || filterer!==""?
	budgetRecords.filter(budget => budget.to === filterer || budget.from === filterer) :
	budgetRecords;

</script>

<h1>Hi from Budgets</h1>
<h3>Budget Transactions</h3>
<span>Filter</span>
<select name="budgets" bind:value={filterer}>
	
	<option value="">All</option>
	{#each data.accounts as account}
		<option value="{account.id}">{account.name}</option>
	{/each}
</select>
	<table>
	<tr>
		<th>Date</th>
		<th>Currency</th>
		<th>Amount</th>
		<th>From</th>
		<th>To</th>
		<th>Comments</th>
	</tr>
{#each budgetList as budget}
		<tr>
			<td>{budget.date}</td>
			<td>{budget.currency}</td>
			<td>{budget.amount}</td>
			<td>{budget.from}</td>
			<td>{budget.to}</td>
			<td>{budget.comments}</td>
		</tr>
{/each}
</table>
