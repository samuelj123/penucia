<script lang="ts">
	import type {Data} from './FunctionBase';
	export let data:Data;
</script>

<h1>Transactions</h1>
<table>
	<tr>
	<th>Date</th>
	<th>Currency</th>
	<th>Amount</th>
	<th>Comments</th>
	<th>Edit</th>
	</tr>
	{#each data.records as record}
	<tr>
		<td>{record.date}</td>	
		<td>{record.currency}</td>	
		<td>{record.amount}</td>	
		<td>{record.comments}</td>	
		<td>Edit</td>	
		</tr>
	{/each}
</table>
