<script lang="ts">
	import { MakeBudgetRecords, getBalancesOfAllAccounts, mergeAccountBalances } from "./DashboardModule.svelte";
	import type { Balance, Data } from "./FunctionBase";
	export let data:Data;

	const budgetBalancesTillToday:Balance[] = 
		getBalancesOfAllAccounts(
			MakeBudgetRecords(data.budgets)
			.filter( bal => new Date(bal.date)<=new Date())
			,data.accounts);

	const currentCashFlowTillToday:Balance[] = 
		getBalancesOfAllAccounts(data.records, data.accounts);

	const comparison = 
	mergeAccountBalances(budgetBalancesTillToday,currentCashFlowTillToday);


</script>


<h1>Budget Categories</h1>
<p><bold>Account Budgeted Spent</bold></p>
{#each comparison as com}
	<p>{ com.account } {com.amount1} AUD {com.amount2}</p>
{/each}
