<script lang="ts">
	import type {Data} from './FunctionBase';
	import AssetsBudgetWidget from "./AssetsBudgetWidget.svelte";
	import BudgetCategories from './BudgetCategories.svelte';
	export let data:Data;
</script>
<h1>Dashboard</h1>
<AssetsBudgetWidget data={data}/>
<BudgetCategories data={data}/>
