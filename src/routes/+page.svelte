<script lang="ts">
	import type {Data, Controls} from "../components/FunctionBase";
	import Dashboard from "../components/Dashboard.svelte";
	let data:Data;

	let controls:Controls = {
		rawdata:"",
		dashboard:false,
		nope:false,
		string:""
	};

	const reset = () => {
		controls = {
			rawdata: "",
			dashboard:false,
			nope:false,
			string:""
		}
	}

	const submitdata = () => {
		controls.nope = true;
		data = JSON.parse(controls.rawdata);
		controls.nope = false;
		controls.dashboard = true;
		controls.string = "data: text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
	}

</script>
{#if !controls.dashboard}
	<input
		type="text"
		bind:value={controls.rawdata}
	/>
	<button on:click={submitdata}>Submit</button>
{:else}
	<Dashboard controls={controls} data={data} on:call-reset={reset}/>
{/if}
{#if controls.nope}
	<h2>Nope</h2>
	<button on:click={reset}>Back</button>
{/if}
