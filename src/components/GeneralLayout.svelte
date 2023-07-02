<script lang="ts">
	import type {Data} from './FunctionBase';
	export let data:Data;
</script>
<h1>Hi from General Layout</h1>

<h3>Regular Transactions</h3>
{#each data.records as record}
	<p>{record.date} {record.currency} {record.amount} {record.comments}</p>
{/each}
