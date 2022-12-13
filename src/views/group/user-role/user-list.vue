<script setup lang="ts">
import usePage from "@/hooks/useTable";
import { options } from "@/hooks/useTable";
import { ElMessage, ElMessageBox } from "element-plus";
import Admin from "@/api/module/admin/admin";
import EditUser from "./user-edit.vue";
import { onMounted, reactive, ref } from "vue";
import Logger from "@/utils/console/index";
import { useRouter } from "vue-router";
const router = useRouter();
const editUserDialog = ref<InstanceType<typeof EditUser> | any>();
const params = reactive<options>({
	url: "/tranbiot-core/cms/admin/users",
	params: {
		page: 0,
		count: 10
	}
});
const { loading, page, count, total, handleQueryList, table_date } = usePage<any>(params);
onMounted(async () => {
	await handleQueryList();
});
const getGroupsName = (list: Array<any>) => {
	let groupResult = "";
	list.forEach((item, index) => {
		if (index > 0) {
			groupResult = groupResult + " " + "/" + " ";
		}
		groupResult = groupResult + item.name;
	});
	return groupResult;
};
// 分页
const handleSizeChange = (val: any) => {
	Logger.log("未使用的變量val:" + val, "val", "分頁");
};
const handleCurrentChange = (val: any) => {
	Logger.log("未使用的變量val:" + val, "val", "分頁");
};
// 删除用户
const handleDeleteUser = (id: number) => {
	ElMessageBox.confirm("是否确认删除", "提示", {
		confirmButtonText: "OK",
		cancelButtonText: "Cancel",
		type: "warning"
	})
		.then(async () => {
			await Admin.deleteUser(id);
			ElMessage({
				type: "success",
				message: "删除成功"
			});
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "已经取消删除"
			});
		});
};
// 添加用户
const handelAddUser = () => {
	router.push({ path: "/group/user-add" });
};
// 编辑用户
const user_detail = reactive({ edit_user: {} });
const openDialogs = ref<boolean>(false);
const handleEditUser = (user: object) => {
	if (editUserDialog.value) {
		editUserDialog.value?.childGetUserDetail(user);
	}
	openDialogs.value = openDialogs.value ? false : true;
	user_detail.edit_user = user;
};
const handlogChildDialog = () => {
	handleQueryList();
	openDialogs.value = false;
};
</script>
<template>
	<div class="app-container">
		<div class="white-box" v-loading="loading">
			<el-button @click="handelAddUser">添加用户</el-button>
			<el-table
				v-show="!loading"
				stripe
				:header-cell-style="{ 'text-align': 'center' }"
				:cell-style="{ 'text-align': 'center' }"
				:data="table_date.list"
				border
			>
				<template #empty>
					<el-empty description="description" />
				</template>
				<el-table-column label="用户名" prop="username" />
				<el-table-column label="邮箱" prop="email" />
				<el-table-column label="权限分组">
					<template #default="scope">
						<div>
							{{ getGroupsName(scope.row.groups) }}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button @click="handleEditUser(scope.row)">编辑</el-button>
						<el-button @click="handleDeleteUser(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				uno-center
				m-t-8
				m-b-10
				background
				v-model:current-page="page"
				:page-size="count"
				layout="total, prev, pager, next"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
			<EditUser ref="editUserDialog" @on-click="handlogChildDialog" :openDialog="openDialogs" />
		</div>
	</div>
</template>
