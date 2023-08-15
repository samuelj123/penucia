<script lang="ts">
	import type {Data} from './FunctionBase';
	import { MakeBudgetRecords } from './DashboardModule.svelte';
	export let data:Data;

	const budgetList = 
	MakeBudgetRecords(data.budgets)
	.sort((a,b) => 
		new Date(a.date).getTime()-new Date(b.date).getTime()
	);

	console.log(budgetList);

</script>

<h1>Hi from Budgets</h1>
<h3>Budget Transactions</h3>
{#each budgetList as budget}
	<p>{budget.date} {budget.currency} {budget.amount} {budget.from} {budget.to} {budget.comments}</p>
{/each}
