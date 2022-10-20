<script setup lang="ts">
import router from "@/router";

const handleLogin = () => {
	router.push({ path: "/login" });
};
</script>
<template>
	<div>
		<el-button @click="handleLogin">wo</el-button>
	</div>
</template>
