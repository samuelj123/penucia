<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Controls, Data } from "./FunctionBase";
	import { isBudgetSensible, checkIfBalanced, MakeBudgetRecords } from "./DashboardModule.svelte";
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

<sidebar>
	<button on:click={Toggleaccounts}>Accounts</button>
	<button on:click={Togglebudgets}>Budgets</button>
	<button on:click={Toggledashboard}>Dashboard</button>
	<a href={controls.rawdata} download="finance.json">Download</a>
	<button on:click={reset}>Exit</button>
</sidebar>

<main>
<h3>If Balanced {checkIfBalanced(data.records, data.accounts)}</h3>
<h3>Is Budget Sensible {isBudgetSensible(MakeBudgetRecords(data.budgets), data.accounts)}</h3>
{#if toggle==="dashboard"}
	<GeneralLayout data={data} />
	{:else if toggle === "accounts"} 
	<AccountsLayout data={data}/>
	{:else if toggle === "budgets"} 
	<BudgetsLayout data={data}/>
{/if}
</main>

<!-- <style> -->
<!-- 	sidebar { -->
<!-- 		min-height: 100vh; -->
<!-- 		position: fixed; -->
<!-- 		top: 0; -->
<!-- 		left: 0; -->
<!-- 		width: clamp(20px, 5vw, 50px); -->
<!-- 		border: 1px solid red; -->
<!-- 	} -->
<!-- 	main { -->
<!-- 		margin-left: clamp(25px, 6vw, 60px); -->
<!-- 	} -->
<!---->
<!-- 	sidebar button, sidebar a { -->
<!-- 		justify-self: center; -->
<!-- 		width: clamp( 15px, 4.5vw, 40px); -->
<!-- 		height: clamp( 15px, 4.5vw, 40px); -->
<!-- 		text-decoration: none; -->
<!-- 		display: block; -->
<!-- 		border: none; -->
<!-- 		font-family: arial; -->
<!-- 		font-size: 1em; -->
<!-- 		color: black; -->
<!-- 		padding: 0; -->
<!-- 		margin: 0; -->
<!-- 		border: 1px solid red; -->
<!-- 		background: none; -->
<!-- 	} -->
<!-- </style> -->
