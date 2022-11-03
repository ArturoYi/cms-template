<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme";
import { useLang } from "@/hooks/useLang";
import { nextTick, provide, ref } from "vue";
// 初始化语言
const { initLang, locale } = useLang();
initLang();
const { initTheme } = useTheme();
/** 初始化主题 */
initTheme();
const onRefresh = () => {
	showPage.value = false;
	nextTick(() => {
		showPage.value = true;
	});
};
const showPage = ref<boolean>(true);
provide("reload", onRefresh);
</script>

<template>
	<ElConfigProvider :locale="locale">
		<router-view v-if="showPage" />
	</ElConfigProvider>
</template>
