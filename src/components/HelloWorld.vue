<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);

const handleLogin = () => {
	count.value++;
};
</script>

<template>
	<button type="button" @click="handleLogin">{{ count }}</button>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
