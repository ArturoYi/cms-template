<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(1);
</script>

<template>
	<el-button type="primaey" plain>{{ count++ }}</el-button>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
