<script lang="ts">
export default {
	name: "PersonalCenter"
};
</script>
<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { ArrowUp } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const show = ref<boolean>(false);
// 显示时触发
const popoverShow = (e: boolean) => {
	show.value = e;
};
// 退出登录
const logout = () => {
	localStorage.clear();
	userStore.loginOut();
};
const goCenter = () => {
	router.push({ path: "/user/center" });
};
</script>
<template>
	<div class="aaa">
		<el-dropdown popper-class="el-dropdown" @visible-change="popoverShow" :show-arrow="false" placement="bottom-start">
			<div ml-5 mr-5 w-50 h-15 flex justify-center items-center>
				<el-avatar :src="userStore.userinfo.avatar" />
				<div class="nickname" flex h-15 w-30 justify-end items-center>
					<p w-25 text-center>{{ userStore.userinfo.nickname }}</p>
					<el-icon :class="{ 'arrowup-none': true, arrowup: show }"><ArrowUp /></el-icon>
				</div>
			</div>
			<template #dropdown>
				<div class="user-option">
					<div class="user-option-top" w-120 h-35 flex justify-center items-center>
						<el-avatar :size="66" :src="userStore.userinfo.avatar" />
						<div w-70 class="item-nickname">{{ userStore.userinfo.nickname }}</div>
					</div>
					<ul w-120 flex flex-col justify-around items-center h-35 class="item-option">
						<li @click="goCenter">个人中心</li>
						<li @click="logout">退出登录</li>
					</ul>
				</div>
			</template>
		</el-dropdown>
	</div>
</template>
<style scoped lang="scss">
@import "@/style/theme/index";
@import "@/style/mixins/mixins";

.nickname {
	font-size: 16px;
	line-height: 3.75rem;
	@include showline(1);

	p {
		@include showline(1);
	}

	.arrowup-none {
		transition: 0.2s;
	}

	.arrowup {
		transform: rotate(180deg);
	}
}

.corner {
	position: fixed;

	// position: absolute;
	top: calc(var(--v3-header-height) - var(--v3-tagsview-height));
	right: 90px;
	z-index: 999 !important;
	width: 27px;
	height: 10px;
}

.user-option {
	position: relative;
	/* stylelint-disable-next-line scss/double-slash-comment-whitespace-inside */
	width: 30rem; //120px
	@media (min-height: 17.5rem) {
		height: 17.5rem !important;
	}
	@media (max-height: 17.5rem) {
		height: 8.75rem !important;
	}

	// w-120 h-70

	.user-option-top {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		color: aliceblue;
		background-image: url("../../assets/layout/user-bg.png");
		background-size: 100% 100%;

		.item-nickname {
			padding-left: 18px;
			height: 30px;
			font-size: 16px;
			line-height: 30px;
			text-align: left;
		}
	}

	.item-option {
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		padding: 10px;

		li {
			padding-left: 8%;
			width: 100%;
			height: 20px;
			font-size: 16px;
			line-height: 20px;
			@include ishover;
		}
	}
}
</style>
<style lang="scss">
.el-dropdown {
	.el-popper__arrow::before {
		top: -8px !important;
		z-index: 1 !important;
		border: none !important;
		width: 45px !important;
		height: 15px !important;
		background: none !important;
		background-color: none !important;
		background-image: url("../../assets/layout/corner.png") !important;
		background-size: 100% 100%;
		transform: none !important;
	}
}
</style>
