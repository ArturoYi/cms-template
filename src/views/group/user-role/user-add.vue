<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import Admin from "@/api/module/admin/admin";
import { useRouter } from "vue-router";
const router = useRouter();
// 获取权限组
const group_all = reactive<any>({ list: [] });
const handleGetAllGroup = async () => {
	const result = await Admin.getGroupList({ page: 0, count: 100 });
	group_all.list = result.data;
};
onMounted(async () => {
	await handleGetAllGroup();
});
const user_form = reactive({
	username: "",
	password: "",
	confirm_password: "",
	email: "",
	group_ids: []
});
// 自定义校验
const checkPasseord = (rule: any, value: any, callback: any) => {
	if (!value) {
		return callback(new Error("Please input the age"));
	}
	if (value === user_form.confirm_password) {
		return callback();
	} else {
		return callback(new Error("两次密码不一致"));
	}
};
// 自定义校验
const checkConfirmPasseord = (rule: any, value: any, callback: any) => {
	if (!value) {
		return callback(new Error("Please input the age"));
	}
	if (value === user_form.password) {
		return callback();
	} else {
		return callback(new Error("两次密码不一致"));
	}
};
const user_rules = reactive<FormRules>({
	username: [{ required: true, message: "Please input Activity name", trigger: "blur" }],
	password: [
		{ required: true, message: "Please input Activity name", trigger: "blur" },
		{
			pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}/, //正则校验不用字符串
			message: "格式错误",
			trigger: "blur"
		},
		{ validator: checkPasseord, trigger: "blur" }
	],
	confirm_password: [
		{ required: true, message: "Please input Activity name", trigger: "blur" },
		{
			validator: checkConfirmPasseord,
			trigger: "blur"
		}
	],
	email: [
		{ required: true, message: "Please input Activity name", trigger: "blur" },
		{
			pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, //正则校验不用字符串
			message: "格式错误",
			trigger: "blur"
		}
	]
});
const userFormRef = ref<FormInstance>();
// 提交
const handelPostUser = async (formrule: FormInstance | undefined) => {
	if (!formrule) return;
	await formrule.validate(async (valid) => {
		if (valid) {
			await Admin.postUser(user_form);
			ElMessage({
				type: "success",
				message: "新增成功"
			});
			router.go(-1);
		} else {
			return false;
		}
	});
};
</script>
<template>
	<div class="app-cantainer">
		<div class="white-box">
			<el-form ref="userFormRef" :model="user_form" :rules="user_rules">
				<el-form-item prop="username" label="用户名">
					<el-input v-model="user_form.username" />
				</el-form-item>
				<el-form-item prop="email" label="邮箱">
					<el-input v-model="user_form.email" />
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input v-model="user_form.password" />
				</el-form-item>
				<el-form-item prop="confirm_password" label="再次输入密码">
					<el-input v-model="user_form.confirm_password" />
				</el-form-item>
				<el-form-item label="权限分组">
					<el-checkbox-group v-model="user_form.group_ids">
						<el-checkbox v-for="item in group_all.list" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<el-button @click="handelPostUser(userFormRef)">提交</el-button>
		</div>
	</div>
</template>
