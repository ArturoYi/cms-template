<script setup lang="ts">
import Admin from "@/api/module/admin/admin";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useThrottleFn } from "@vueuse/core";
import { ElMessage } from "element-plus";
const router = useRouter();
const group_id = router.currentRoute.value.params.id;
const permissions = reactive<any>({ alllist: [], currentlist: [], checklist: [], removelist: [] });
const getAllPermissions = async () => {
	const result = await Admin.getAllPermissions();
	Object.entries(result).forEach(([k, v]) => {
		permissions.alllist.push({
			name: k,
			checkPermission: [],
			allPermissions: v,
			allPermissionsIds: v.map((item: any) => {
				return item.id;
			}),
			isIndeterminate: ref(false),
			checkAll: ref(false)
		});
	});
	await getCurrentGroupDetail(Number(group_id));
};
const getCurrentGroupDetail = async (id: number) => {
	const result = await Admin.getGroupDetail(id);
	permissions.currentlist = result.data.permissions.map((item: any) => {
		return item.id;
	});
	for (const i in result.data.permissions) {
		for (const j in permissions.alllist) {
			if (permissions.alllist[j].name === result.data.permissions[i].module) {
				permissions.alllist[j].checkPermission.push(result.data.permissions[i].id);
				handleCheckedPermissionChange(j);
			}
		}
	}
};
const handleCheckedPermissionChange = (index: string) => {
	// 这是判断是否全选
	permissions.alllist[index].checkAll = permissions.alllist[index].checkPermission.length === permissions.alllist[index].allPermissions.length;
	// 这里判断选了那些
	permissions.alllist[index].isIndeterminate =
		permissions.alllist[index].checkPermission.length > 0 &&
		permissions.alllist[index].checkPermission.length < permissions.alllist[index].allPermissions.length;
};
onMounted(async () => {
	await getAllPermissions();
});
// 全选或不选
const handleCheckAllChange = (index: number) => {
	permissions.alllist[index].checkPermission = permissions.alllist[index].checkAll ? permissions.alllist[index].allPermissionsIds : [];
	permissions.alllist[index].isIndeterminate = false;
};
// 保存
const handleSaveGroup = useThrottleFn(async () => {
	for (const index in permissions.alllist) {
		permissions.checklist = [...permissions.checklist, ...permissions.alllist[index].checkPermission];
	}
	// 去重
	permissions.checklist = Array.from(new Set(permissions.checklist));
	// 要删除的
	permissions.removelist = permissions.currentlist.filter((item: any) => !permissions.checklist.includes(item));
	await Admin.putGroupPermissions({
		group_id: group_id,
		permission_ids: permissions.checklist
	});
	await Admin.removeGroupPermission({
		group_id: group_id,
		permission_ids: permissions.removelist
	});
	console.log(permissions.currentlist, permissions.checklist, permissions.removelist);
	ElMessage({
		type: "success",
		message: "更新成功"
	});
}, 500);
</script>
<template>
	<div class="app-container">
		<div class="white-box">
			<div v-for="(parent, index) in permissions.alllist" :key="index">
				<el-checkbox @change="handleCheckAllChange(index)" :indeterminate="parent.isIndeterminate" v-model="parent.checkAll">{{
					parent.name
				}}</el-checkbox>
				<div>
					<el-checkbox-group pl-15 pr-100 v-model="parent.checkPermission" @change="handleCheckedPermissionChange(index)">
						<el-checkbox v-for="(item, index) in parent.allPermissions" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
			<!-- 提交 -->
			<el-button @click="handleSaveGroup">提交</el-button>
		</div>
	</div>
</template>
