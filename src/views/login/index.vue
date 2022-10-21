<script lang="ts" setup>
import router from "@/router";
import root from "@/api/module/root";
import { userStore } from "@/store/modules/user";
import localStorage from "@/utils/cache/localStorage";
const handle = () => {
	router.push({ path: "/" });
};

const handleLogin = () => {
	root
		.getToken({ username: "root", password: "123456" })
		.then((success) => {
			localStorage.set("access_token", "Bearer " + success.data.data.access_token);
			localStorage.set("refresh_toke", "Bearer " + success.data.data.refresh_token);
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => {
			handlePermission();
		});
};

const handlePermission = () => {
	root
		.getInfo()
		.then((success) => {
			userStore().setInfo(success.data.data);
		})
		.catch((error) => {
			console.log(error);
		});
};
const handleinfo = () => {
	const res = userStore().userinfo;
	console.log(res);
};
</script>
<template>
	<div>
		<el-button @click="handle">12</el-button>
		<el-button @click="handleLogin">12</el-button>
		<el-button @click="handleinfo">12</el-button>
	</div>
</template>
