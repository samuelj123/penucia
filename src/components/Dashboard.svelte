<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import type { Controls, Data } from "./FunctionBase";
	export let data:Data;
	export let controls:Controls;
	const dispatch = createEventDispatcher();
	const reset = () => dispatch('call-reset');

</script>


<a href={controls.string} download="finance.json">Download</a>
<button on:click={reset}>Back</button>
<h1>List of Accounts</h1>
{#each data.accounts as account}
	<p>{account.name}</p>
{/each}
