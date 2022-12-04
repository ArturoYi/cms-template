<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import { useRolesStore } from "@/store/modules/roles";
import { reactive } from "vue";
import { Lock, User } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useThrottleFn } from "@vueuse/core";
const router = useRouter();

const loginForm = reactive({
	username: "",
	password: ""
});

const userStore = useUserStore();
const rolesStore = useRolesStore();
// 1000毫秒防抖
const handleLogin = useThrottleFn(async () => {
	if (loginForm.username !== "" && loginForm.password !== "") {
		await userStore.login();
		await userStore.setInfo();
		rolesStore.setRoutes();
		router.push({ path: "/" });
		ElMessage({
			showClose: true,
			message: "登录成功",
			type: "success"
		});
	} else {
		ElMessage({
			showClose: true,
			message: "用户名或密码为空",
			type: "error"
		});
	}
}, 1000);
</script>
<template>
	<div unocss-z-index-1>
		<div class="login-box">
			<el-form label-position="top" label-width="100px" :model="loginForm" style="max-width: 100%">
				<el-form-item label="用户名">
					<el-input :prefix-icon="User" style="height: 40px" v-model="loginForm.username" />
				</el-form-item>
				<el-form-item label="密码">
					<el-input :prefix-icon="Lock" show-password style="height: 40px" v-model="loginForm.password" />
				</el-form-item>
				<el-form-item>
					<el-button @click="handleLogin" size="large" style="width: 100%" type="primary">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<style scoped lang="scss">
.login-box {
	position: absolute;
	top: 50%;
	left: 50%;
	border: 1px solid rgb(163 163 163);
	border-radius: 8px;
	padding: 50px;
	min-width: 400px;
	max-width: 500px;
	max-height: 600px;
	transform: translate(-50%, -50%);
}
</style>
