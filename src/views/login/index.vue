<script lang="ts" setup>
import router from "@/router";

const handleLogin = () => {
	router.push({ path: "/" });
};
</script>
<template>
	<div>
		<el-button @click="handleLogin">12</el-button>
	</div>
</template>
