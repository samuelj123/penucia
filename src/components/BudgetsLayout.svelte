<script lang="ts">
	import type {Data} from './FunctionBase';
	import { MakeBudgetRecords } from './DashboardModule.svelte';
	export let data:Data;
</script>

<h1>Hi from Budgets</h1>
<h3>Budget Transactions</h3>
{#each MakeBudgetRecords(data.budgets) as budget}
	<p>{budget.date} {budget.currency} {budget.amount} {budget.comments}</p>
{/each}
