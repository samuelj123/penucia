<script lang="ts">
	import type {Data, Balance } from "./FunctionBase";
	import {currencyCalc} from "./FunctionBase";
	import {
		IncomeVsExpenses, 
		MakeBudgetRecords,
		sevenDaysAgo,
		getBalancesOfAllAccounts,
	} from "./DashboardModule.svelte";
	export let data:Data;

	// Variables For Widget

	const budgetBalancesTillToday:Balance[] = 
		getBalancesOfAllAccounts(
			MakeBudgetRecords(data.budgets)
			.filter( bal => new Date(bal.date)<=new Date())
			,data.accounts);
	
	const cashFlowFromBeginning:Balance[] = 
		getBalancesOfAllAccounts(data.records, data.accounts);

	export const totalspendableamount = currencyCalc(
			IncomeVsExpenses(budgetBalancesTillToday) - 
				IncomeVsExpenses(cashFlowFromBeginning)
		);

	const CashflowForThisWeek:Balance[] = 
	getBalancesOfAllAccounts(
		data.records.filter(rec => sevenDaysAgo(rec)),
		data.accounts);

	const BudgetedFlowThisWeek:Balance[] = 
	getBalancesOfAllAccounts(
			MakeBudgetRecords(data.budgets)
			.filter(rec => sevenDaysAgo(rec)),
		data.accounts);

	const commwealthCheckingBal = 
	cashFlowFromBeginning.filter(c => c.account=="commwealthchecking")[0].amount;

	const weeklySpendableAmount = currencyCalc(
		IncomeVsExpenses(BudgetedFlowThisWeek) - 
		IncomeVsExpenses(CashflowForThisWeek)
	);
</script>

<h3>Current Status</h3>
<h2>Commonwealth Checking Balance: {commwealthCheckingBal}</h2>
<p>Budget Balances Till Today = {IncomeVsExpenses(budgetBalancesTillToday)} AUD</p>
<p>Current Cash Flow Till Today = {IncomeVsExpenses(cashFlowFromBeginning)} AUD</p>
<p>This Week's Budgeted Flow = {IncomeVsExpenses(BudgetedFlowThisWeek)} AUD</p>
<p>This Week's Cash Flow = {IncomeVsExpenses(CashflowForThisWeek)} AUD</p>
{#if totalspendableamount>=0}
	<p>You have {totalspendableamount} AUD to spend</p>
{:else}
	<p>You are {totalspendableamount} AUD over-budget!</p>
{/if}

{#if weeklySpendableAmount>=0}
	<p>You have {weeklySpendableAmount} AUD to spend for this week</p>
{:else}
	<p>You are {weeklySpendableAmount} AUD over-budget this week!</p>
{/if}
