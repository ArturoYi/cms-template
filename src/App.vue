<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme";
import { useLang } from "@/hooks/useLang";
// 初始化语言
const { initLang, locale } = useLang();
initLang();
const { initTheme } = useTheme();
/** 初始化主题 */
initTheme();
</script>

<template>
	<ElConfigProvider :locale="locale">
		<router-view />
	</ElConfigProvider>
</template>
