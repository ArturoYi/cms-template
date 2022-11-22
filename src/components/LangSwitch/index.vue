<script lang="ts">
export default {
	name: "LangSwitch"
};
</script>
<script setup lang="ts">
import { LangName, useLang } from "@/hooks/useLang";
import { Orange } from "@element-plus/icons-vue";
const { langList, activeLangName, setHtmlLangName } = useLang();

const handleSetLang = (name: LangName) => {
	activeLangName.value = name;
	setHtmlLangName(name);
};
</script>
<template>
	<el-dropdown trigger="click" @command="handleSetLang">
		<div>
			<el-tooltip effect="dark" content="语言" placement="bottom">
				<el-icon :size="26">
					<Orange />
				</el-icon>
			</el-tooltip>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="(lang, index) in langList" :key="index" :disabled="activeLangName === lang.name" :command="lang.name">
					<span>{{ lang.title }}</span></el-dropdown-item
				>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
