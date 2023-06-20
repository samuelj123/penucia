<script lang="ts">
	let rawdata="";
	let dashboard=false;
	let nope:boolean;
	let data:Data;
	let string: string;

	interface Data{
		accounts: object[];
		records: object[];
		budgets: object[];
	}

	const submitdata = () => {
		nope = true;
		data = JSON.parse(rawdata);
		nope = false;
		dashboard = true;
		string = "data: text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
	}

	const reset = () => {
		rawdata = "";
		dashboard = false;
		nope = false;
		string = "";
	}
</script>

{#if !dashboard}
	<input
		type="text"
		bind:value={rawdata}
	/>
	<button on:click={submitdata}>Submit</button>
{:else}
	<a href={string} download="finance.json">Download</a>
	<button on:click={reset}>Back</button>
{/if}
{#if nope}
	<h2>Nope</h2>
	<button on:click={reset}>Back</button>
{/if}
