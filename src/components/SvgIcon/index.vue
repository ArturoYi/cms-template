<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
	prefix: {
		type: String,
		default: "icon"
	},
	name: {
		type: String,
		required: true
	}
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
	<svg class="svg-icon" aria-hidden="true">
		<use :href="symbolId" />
	</svg>
</template>

<style lang="scss" scoped>
.svg-icon {
	overflow: hidden;
	width: 1em;
	height: 1em;
	fill: currentcolor;
}
</style>
