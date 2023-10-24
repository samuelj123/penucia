<script lang="ts">
	import { MakeBudgetRecords, mergeAccountBalances, getBalancesOfAllAccounts, calcBalTotal } from './DashboardModule.svelte';
	import type {Data} from './FunctionBase';
	import {currencyCalc} from'./FunctionBase';
	export let data:Data;

	let allAccounts = getBalancesOfAllAccounts(data.records, data.accounts);
	let budgetRecords = MakeBudgetRecords(data.budgets);
	let allBudgets = getBalancesOfAllAccounts(budgetRecords, data.accounts);
	let accounts = mergeAccountBalances(allAccounts, allBudgets);

	let accountTotals = {assets: 0, liabilities: 0, income: 0, expenditure: 0};
	accountTotals.assets = calcBalTotal(allAccounts.filter(acc => acc.type==="asset"));
	accountTotals.liabilities = calcBalTotal(allAccounts.filter(acc => acc.type==="liability"));
	accountTotals.income = calcBalTotal(allAccounts.filter(acc => acc.type==="income"));
	accountTotals.expenditure = calcBalTotal(allAccounts.filter(acc => acc.type==="expense"));

	let budgetTotals = {assets: 0, liabilities: 0, income: 0, expenditure: 0};
	budgetTotals.assets = calcBalTotal(allBudgets.filter(acc => acc.type==="asset"));
	budgetTotals.liabilities = calcBalTotal(allBudgets.filter(acc => acc.type==="liability"));
	budgetTotals.income = calcBalTotal(allBudgets.filter(acc => acc.type==="income"));
	budgetTotals.expenditure = calcBalTotal(allBudgets.filter(acc => acc.type==="expense"));

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
		<td>{ accountTotals.assets }</td>
		<td>{ budgetTotals.assets }</td>
	</tr>
	<tr>
		<td>Liabilities</td>
		<td>{ accountTotals.liabilities }</td>
		<td>{ budgetTotals.liabilities }</td>
	</tr>
	<tr>
		<td>Income</td>
		<td>{ accountTotals.income }</td>
		<td>{ budgetTotals.income }</td>
	</tr>
	<tr>
		<td>Expenditure</td>
		<td>{ accountTotals.expenditure }</td>
		<td>{ budgetTotals.expenditure }</td>
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
