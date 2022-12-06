<script lang="ts">
export default {
	name: "EditUser"
};
</script>
<script setup lang="ts">
import { computed, reactive, ref, defineExpose, onMounted } from "vue";
import { ElMessage, FormInstance, FormRules, TabsPaneContext } from "element-plus";
import Admin from "@/api/module/admin/admin";
const all_group = reactive({ all_list: {}, select_list: { group_ids: [] } });
onMounted(async () => {
	const result = await Admin.getGroupList({ page: 0, count: 100 });
	all_group.all_list = result.data;
});
const props = defineProps({
	openDialog: {
		type: Boolean,
		default: false,
		required: true
	}
});
const emit = defineEmits<{
	(e: "on-click", name: boolean, isPut?: boolean): void;
}>();
// props是单项数据流
const openToDialog = computed({
	get() {
		return props.openDialog;
	},
	set(v) {
		console.log(v, "props是单项数据流。这里不写入值");
	}
});
// 关闭要在父组件关闭
const handleEditUserClose = (isPut?: boolean) => {
	emit("on-click", !props.openDialog, isPut);
};
// 模态框
const activeName = ref<string>("info");
const handleClickTabs = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
const userInfoRef = ref<FormInstance | undefined>();
// 接收用户信息
const userDetail = reactive<any>({ editUser: {} });
defineExpose({
	childGetUserDetail: (user: any) => {
		userDetail.editUser = {};
		resetForm(userInfoRef.value);
		userDetail.editUser = {
			id: user.id,
			username: user.username,
			groups: user.groups,
			email: user.email
		};
		console.log(user);
		all_group.select_list.group_ids = user.groups.map((item: any) => {
			return item.id;
		});
	}
});
// 用户密码
// 自定义校验
const checkPasseord = (rule: any, value: any, callback: any) => {
	if (!value) {
		return callback(new Error("Please input the age"));
	}
	if (value === user_new_password.confirm_password) {
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
	if (value === user_new_password.new_password) {
		return callback();
	} else {
		return callback(new Error("两次密码不一致"));
	}
};
const user_new_password = reactive({ new_password: "", confirm_password: "" });
const user_password_rules = ref<FormRules>({
	new_password: [
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
	]
});
const userPasswordRef = ref<FormInstance>();
const handleClickPutPassword = async (elForm: FormInstance | undefined) => {
	if (!elForm) return;
	await elForm?.validate(async (valid, fields) => {
		if (valid) {
			await Admin.putUserPassword(userDetail.editUser.id, user_new_password);
			ElMessage({
				type: "success",
				message: "更新成功"
			});
			handleEditUserClose();
			resetForm(userPasswordRef.value);
		} else {
			console.warn(fields);
			return false;
		}
	});
};
// 验证
const user_detail_rules = ref<FormRules>({
	username: [{ required: true, message: "Please input Activity name", trigger: "blur" }],
	email: [
		{ required: true, message: "Please input Activity name", trigger: "blur" },
		{
			pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, //正则校验不用字符串
			message: "格式错误",
			trigger: "blur"
		}
	]
});
const handleClickSaveUserInfo = async (elForm: FormInstance | undefined) => {
	if (!elForm) return;
	await elForm.validate(async (valid, fields) => {
		if (valid) {
			await Admin.putUser(userDetail.editUser.id, all_group.select_list);
			ElMessage({
				type: "success",
				message: "更新成功"
			});
			handleEditUserClose();
			resetForm(userInfoRef.value);
		} else {
			console.warn(fields);
			return false;
		}
	});
};
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>
<template>
	<div>
		<el-dialog title="Tips" width="50%" :before-close="handleEditUserClose" v-model="openToDialog">
			<el-tabs @tab-click="handleClickTabs" v-model="activeName">
				<el-tab-pane name="info" label="info">
					<el-form :model="userDetail.editUser" ref="userInfoRef" :rules="user_detail_rules">
						<el-form-item label="名字" prop="username">
							<el-input disabled v-model="userDetail.editUser.username" />
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input disabled v-model="userDetail.editUser.email" />
						</el-form-item>
						<el-form-item label="权限组">
							<el-checkbox-group v-model="all_group.select_list.group_ids">
								<el-checkbox v-for="item in all_group.all_list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
					<el-button @click="handleClickSaveUserInfo(userInfoRef)">保存</el-button>
				</el-tab-pane>
				<el-tab-pane name="password" label="password">
					<el-form :model="user_new_password" ref="userPasswordRef" :rules="user_password_rules">
						<el-form-item label="密码" prop="new_password"> <el-input v-model="user_new_password.new_password" /></el-form-item>
						<el-form-item label="再输入一次密码" prop="confirm_password"> <el-input v-model="user_new_password.confirm_password" /></el-form-item>
					</el-form>
					<el-button @click="handleClickPutPassword(userPasswordRef)">保存</el-button></el-tab-pane
				>
			</el-tabs>
		</el-dialog>
	</div>
</template>
