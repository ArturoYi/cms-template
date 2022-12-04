<template>
	<Editor id="uuid" v-if="!switching" v-model="content" :api-key="apiKey" :init="init" />
</template>
<script lang="ts">
export default {
	name: "TinymceVue"
};
</script>
<script setup lang="ts">
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme"; // 主题文件
import "tinymce/icons/default";
import "tinymce/models/dom";
import { useTheme } from "@/hooks/useTheme";
import { useLang } from "@/hooks/useLang";
import "./plugins"; //引入插件
import { nextTick, onMounted, reactive, ref, watch } from "vue";
const emits = defineEmits(["getContent"]);
// import { onMounted, defineEmits, watch } from "@vue/runtime-core"
// props
const props = defineProps({
	value: {
		type: String,
		default: (): string => {
			return "";
		}
	},
	baseUrl: {
		type: String,
		default: ""
	},
	disabled: {
		type: Boolean,
		default: false
	},
	plugins: {
		type: [String, Array],
		default: "lists image media table wordcount fullscreen"
	}, //必填
	toolbar: {
		type: [String, Array],
		default:
			"codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo |  formatselect | forecolor backcolor | bullist numlist outdent indent | lists link image media table code | removeformat | fullscreen"
	} //必填
});

// 控制显示隐藏
const switching = ref<boolean>(false);
// 控制主题
const theme = useTheme().activeThemeName;
// 控制语言
const lang = useLang().activeLangName;
// 文本的值
const content = ref<string>(props.value);
const apiKey = ref("");
// 初始化init对象
const init = reactive({
	selector: "textarea",
	language_url: "/tinymce/langs/zh-Hans.js", // 语言包的路径，具体路径看自己的项目，
	language: lang.value === "zh_cn" ? "zh-Hans" : "zh-Hans", //语言类型
	placeholder: "在这里输入文字",
	browser_spellcheck: true, // 拼写检查
	min_width: 300,
	min_height: 200,
	height: 400, //注：引入autoresize插件时，此属性失效
	resize: "both", //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
	branding: false, //tiny技术支持信息是否显示
	// statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
	elementpath: false, //元素路径是否显示

	// 字体样式
	font_size_formats: "11px 12px 14px 16px 18px 24px 36px 48px",
	font_family_formats:
		"微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
	// 插件配置 axupimgs indent2em
	plugins: props.plugins,
	//工具栏配置，设为false则隐藏
	toolbar: props.toolbar,
	//菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”
	// menubar: "file edit my1",
	menubar: true,
	paste_webkit_styles: "all",
	paste_merge_formats: true,
	nonbreaking_force_tab: false,
	paste_auto_cleanup_on_paste: false,
	file_picker_types: "file image media",
	// 自定义toolbar按钮，需要在toolbar添加
	// editor.ui.registry.addButton("testBtn", {
	// 	text: `按钮文字`,
	// 	tooltip: "按钮提示",
	// 	onAction: () => editor.insertContent('<a href="https://www.baidu.com" target="_blank">test text</a>')
	// });
	skin_url: "/tinymce/skins/ui/oxide" + (theme.value === "dark" ? "-dark" : ""), // skin路径，具体路径看自己的项目
	content_css: theme.value === "dark" ? "/tinymce/skins/content/dark/content.css" : "/tinymce/skins/content/default/content.css" //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
});
watch(
	() => props.value,
	() => {
		content.value = props.value;
		emits("getContent", content.value);
	}
);

//监听富文本中的数据变化
watch(
	() => content.value,
	() => {
		emits("getContent", content.value);
	}
);
watch(
	() => theme.value,
	() => {
		if (theme.value === "dark") {
			init.skin_url = "/tinymce/skins/ui/oxide-dark";
			init.content_css = "/tinymce/skins/content/dark/content.css";
		}
		if (theme.value === "normal") {
			init.skin_url = "/tinymce/skins/ui/oxide";
			init.content_css = "/tinymce/skins/content/default/content.css";
		}
		switching.value = true;
		const instance = tinymce.get("uuid");
		instance?.destroy();
		nextTick(() => {
			switching.value = false;
		});
	}
);
//在onMounted中初始化编辑器
onMounted(() => {
	tinymce.init({});
});
</script>

<!-- <style lang="scss" scoped></style> -->
