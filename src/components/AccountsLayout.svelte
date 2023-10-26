<script lang="ts">
	import { MakeBudgetRecords, mergeAccountBalances, getBalancesOfAllAccounts, calcBalTotal } from './DashboardModule.svelte';
	import type {Balance, Data} from './FunctionBase';
	import {currencyCalc} from'./FunctionBase';
	export let data:Data;

	let allAccounts = getBalancesOfAllAccounts(data.records, data.accounts);
	let budgetRecords = MakeBudgetRecords(data.budgets);
	let allBudgets = getBalancesOfAllAccounts(budgetRecords, data.accounts);
	let accounts = mergeAccountBalances(allAccounts, allBudgets);

	let getTotals = (accounts:Balance[]) => {
		let totals = {assets: 0, liabilities: 0, income: 0, expenditure: 0, total:0};
		totals.assets = calcBalTotal(accounts.filter(acc => acc.type==="asset"));
		totals.liabilities = calcBalTotal(accounts.filter(acc => acc.type==="liability"));
		totals.income = calcBalTotal(accounts.filter(acc => acc.type==="income"));
		totals.expenditure = calcBalTotal(accounts.filter(acc => acc.type==="expense"));
		return totals;
	}

</script>

<h3>List of Accounts</h3>
<table>
	<tr>
		<th></th>
		<th>Account</th>
		<th>Budgeted Account</th>
	</tr>
	<tr>
		<td>Assets</td>
		<td>{ getTotals(allAccounts).assets }</td>
		<td>{ getTotals(allBudgets).assets }</td>
	</tr>
	<tr>
		<td>Liabilities</td>
		<td>{ getTotals(allAccounts).liabilities }</td>
		<td>{ getTotals(allBudgets).liabilities }</td>
	</tr>
	<tr>
		<td>Income</td>
		<td>{ getTotals(allAccounts).income }</td>
		<td>{ getTotals(allBudgets).income }</td>
	</tr>
	<tr>
		<td>Expenditure</td>
		<td>{ getTotals(allAccounts).expenditure }</td>
		<td>{ getTotals(allBudgets).expenditure }</td>
	</tr>
	<tr>
		<td><b>Totals</b></td>
		<td><b>{ currencyCalc(getTotals(allAccounts).assets + getTotals(allAccounts).liabilities + getTotals(allAccounts).income + getTotals(allAccounts).expenditure) }</b></td>
		<td><b>{ currencyCalc(getTotals(allBudgets).assets + getTotals(allBudgets).liabilities + getTotals(allBudgets).income + getTotals(allBudgets).expenditure) }</b></td>
	</tr>
</table>
<table>
	<tr>
		<th>Account</th>
		<th>Type</th>
		<th>Currency</th>
		<th>Current Balance</th>
		<th>Budgeted Balance</th>
		<th>Difference</th>
	</tr>
{#each accounts as account}
	<tr>
		<td>{account.account}</td>
		<td>{account.type}</td>
		<td>{account.currency}</td>
		<td>{account.amount1}</td>
		<td>{account.amount2}</td>
		<td>{currencyCalc(account.amount1 - account.amount2)}</td>
	</tr>
{/each}
</table>
