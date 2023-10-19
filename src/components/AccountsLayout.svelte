<script lang="ts">
	import { MakeBudgetRecords, mergeAccountBalances, getBalancesOfAllAccounts } from './DashboardModule.svelte';
	import type {Data} from './FunctionBase';
	import {currencyCalc} from'./FunctionBase';
	export let data:Data;
</script>
<h3>List of Accounts</h3>
<table>
	<tr>
		<th>Account</th>
		<th>Type</th>
		<th>Currency</th>
		<th>Current Balance</th>
		<th>Budgeted Balance</th>
		<th>Difference</th>
	</tr>
{#each mergeAccountBalances(getBalancesOfAllAccounts(data.records, data.accounts), getBalancesOfAllAccounts(MakeBudgetRecords(data.budgets), data.accounts)) as asset}
	<tr>
		<td>{asset.account}</td>
		<td>{asset.type}</td>
		<td>{asset.currency}</td>
		<td>{asset.amount1}</td>
		<td>{asset.amount2}</td>
		<td>{currencyCalc(asset.amount1 - asset.amount2)}</td>
	</tr>
{/each}
</table>
