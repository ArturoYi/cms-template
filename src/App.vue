<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
/** 将 Element-Plus 的语言设置为中文 */
const locale = zhCn;
</script>

<template>
	<ElConfigProvider :locale="locale">
		<router-view />
	</ElConfigProvider>
</template>
