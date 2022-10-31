<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
// import { getCurrentInstance } from "vue";
// import { usePermissionStore } from "@/store/modules/permission";
import { useRouter } from "vue-router";
const router = useRouter();
const handle = () => {
	router.push({ path: "/" });
};

const userStore = useUserStore();

const handleLogin = async () => {
	await userStore.login();
	await userStore.setInfo();
};
const handles = () => {
	console.log(userStore.userinfo);
};

// const { proxy }: any = getCurrentInstance();
const bash = () => {
	// usePermissionStore().getRoutes(userStore.userinfo.admin, userStore.userinfo.permissions);
	// console.log(usePermissionStore().getRoutes(userStore().userinfo.admin, userStore().userinfo.permissions));
};
</script>
<template>
	<div>
		<el-button @click="handle">12</el-button>
		<el-button @click="handleLogin">12</el-button>
		<el-button @click="handles">查看pinia</el-button>
		<el-button @click="bash">查看路由</el-button>
	</div>
</template>
