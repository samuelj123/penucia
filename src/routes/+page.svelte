<script lang="ts">
	import type {Data, Controls} from "../components/FunctionBase";
	import Dashboard from "../components/Dashboard.svelte";

	let data:Data;


	let controls:Controls = {
		rawdata:"",
		dashboard:false,
		nope:false
	};

	const reset = () => {
		controls = {
			rawdata: "",
			dashboard:false,
			nope:false
		}
	}

	const handleFileUpload = async (event:any) => {
		const file = event.target.files[0];
		controls.nope = true;
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target!) {
					data = JSON.parse(event.target.result as string);
				};
				controls.nope = false;
				controls.rawdata = "data: text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
				controls.dashboard = true;
			}
			reader.readAsText(file);
		}
	}
</script>



{#if !controls.dashboard}
	<input type="file" id="jsonFileInput" accept=".json" on:change={handleFileUpload}>
		{:else}
	<Dashboard controls={controls} data={data} on:call-reset={reset}/>
{/if}
{#if controls.nope}
	<h2>Nope</h2>
	<button on:click={reset}>Back</button>
{/if}
