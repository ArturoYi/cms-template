<!--
 * @Description:
 * @User: Chen
 * @Date: 2022-12-02 17:34:07
-->
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import Admin from "@/api/module/admin/admin";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Logger from "@/utils/console/index";
const router = useRouter();
type CreateGroup = {
	name: string;
	info: string;
};
const group_form = reactive<CreateGroup>({
	name: "",
	info: ""
});
const ruleFormRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
	name: [{ required: true, message: "Please input Activity name", trigger: "blur" }],
	info: [{ required: true, message: "Please input Activity name", trigger: "blur" }]
});
const handlePostGroup = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			await Admin.postGroup(group_form);
			ElMessage({
				type: "success",
				message: "添加成功"
			});
			router.go(-1);
		} else {
			Logger.error(fields, "驗證失敗", "group-add.vue:38");
			return false;
		}
	});
};
</script>
<template>
	<div class="app-container">
		<div class="white-box">
			<el-form :model="group_form" :rules="formRules" ref="ruleFormRef">
				<el-form-item label="名称" prop="name">
					<el-input v-model="group_form.name" />
				</el-form-item>
				<el-form-item label="介绍" prop="info">
					<el-input v-model="group_form.info" />
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="handlePostGroup(ruleFormRef)">提交</el-button>
		</div>
	</div>
</template>
