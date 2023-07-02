<script lang="ts">
	import { Budgets, mergeAccountBalances, getBalancesOfAllAccounts } from './Dashboard.svelte';
	import type {Data} from './FunctionBase';
	import {currencyCalc} from'./FunctionBase';
	export let data:Data;
</script>
<h1>Hi from Accounts</h1>
<h3>List of Accounts</h3>
{#each mergeAccountBalances(getBalancesOfAllAccounts(data.records, data.accounts), getBalancesOfAllAccounts(Budgets(data.budgets), data.accounts)) as asset}
	<p>{asset.account} - {asset.type} {asset.amount1} {asset.amount2} {currencyCalc(asset.amount1 - asset.amount2)}</p>
{/each}
