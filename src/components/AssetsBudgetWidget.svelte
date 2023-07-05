<script lang="ts">
	import type {Data, Balance } from "./FunctionBase";
	import {currencyCalc} from "./FunctionBase";
	import {
		IncomeVsExpenses, 
		MakeBudgetRecords,
		SevenDaysAgo,
		getBalancesOfAllAccounts,
	} from "./DashboardModule.svelte";
	export let data:Data;

	// Variables For Widget
	const assets:Balance[] = 
		getBalancesOfAllAccounts(data.records, data.accounts)
		.filter(asset => asset.type =="expense"); 

	const budgetBalancesTillToday:Balance[] = 
		getBalancesOfAllAccounts(
			MakeBudgetRecords(data.budgets)
			.filter( bal => new Date(bal.date)<=new Date())
			,data.accounts);
	
	const currentCashFlowTillToday:Balance[] = 
		getBalancesOfAllAccounts(data.records, data.accounts);

	export const totalspendableamount = currencyCalc(
			IncomeVsExpenses(budgetBalancesTillToday) - 
				IncomeVsExpenses(currentCashFlowTillToday)
		);

	const CashflowForThisWeek:Balance[] = 
	getBalancesOfAllAccounts(
		data.records.filter(rec => SevenDaysAgo(rec)),
		data.accounts);

	console.log(CashflowForThisWeek);
	const BudgetedFlowThisWeek:Balance[] = 
	getBalancesOfAllAccounts(
			MakeBudgetRecords(data.budgets)
			.filter(rec => SevenDaysAgo(rec)),
		data.accounts);

	console.log(data.records.filter(x => new Date(x.date)<=new Date()));
</script>

<h3>Current Status</h3>
<p>Budget Balances Till Today = {IncomeVsExpenses(budgetBalancesTillToday)} AUD</p>
<p>Current Cash Flow Till Today = {IncomeVsExpenses(currentCashFlowTillToday)} AUD</p>
<p>This Week's Budgeted Flow = {IncomeVsExpenses(BudgetedFlowThisWeek)} AUD</p>
<p>This Week's Cash Flow = {IncomeVsExpenses(CashflowForThisWeek)} AUD</p>
{#if totalspendableamount>=0}
	<p>You have {totalspendableamount} AUD to spend</p>
{:else}
	<p>You are {totalspendableamount} AUD over-budget!</p>
{/if}

<p>{IncomeVsExpenses(assets)}</p>
<!-- {#each assets as asset } -->
<!-- 	<p>{asset.account} = {asset.amount}</p> -->
<!-- {/each} -->
