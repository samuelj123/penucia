<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Controls, Data } from "./FunctionBase";
	import { isBudgetSensible, checkIfBalanced, Budgets } from "./DashboardModule.svelte";
	import GeneralLayout from "./GeneralLayout.svelte";
	import AccountsLayout from "./AccountsLayout.svelte";
	import BudgetsLayout from "./BudgetsLayout.svelte";

	export let data:Data;
	export let controls:Controls;

	const dispatch = createEventDispatcher();
	const reset = () => dispatch('call-reset');

	let toggle = "dashboard";
	const Toggleaccounts = () => toggle = "accounts";
	const Togglebudgets = () => toggle = "budgets";
	const Toggledashboard = () => toggle = "dashboard";

</script>

<nav>
	<button on:click={Toggleaccounts}>Accounts</button>
	<button on:click={Togglebudgets}>Budgets</button>
	<button on:click={Toggledashboard}>Dashboard</button>
	<a href={controls.string} download="finance.json">Download</a>
	<button on:click={reset}>Exit</button>
</nav>


{#if toggle==="dashboard"}
	<GeneralLayout data={data} />
	{:else if toggle === "accounts"} 
	<AccountsLayout data={data}/>
	{:else if toggle === "budgets"} 
	<BudgetsLayout data={data}/>
{/if}


<h3>If Balanced {checkIfBalanced(data.records, data.accounts)}</h3>
<h3>Is Budget Sensible {isBudgetSensible(Budgets(data.budgets), data.accounts)}</h3>
