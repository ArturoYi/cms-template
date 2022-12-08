# cms-template

## 推荐使用 pnpm

## 简繁体转换在线

https://jf.xmu.edu.cn/online.html

## 生成环境主要依赖

- vue3
- pinia
- vue-router
- axios
- tinymce
- element-plus
- lodash-es
- vue-i18n
- ......

## 开发环境主要依赖

- ts
- stylelint
- commitlint
- eslint
- prettier
- vite
- unocss
- ......

## cms

社区上存在大量的 cms 管理系统，但如果要用于企业需求中的需要谨慎，因为面临的不仅仅是开发成本，还有后续带来的维护成本。该模板经过实践极积累总结出来，对业务来说，常见的 cms 管理系统有下面一些特点：

对用户来说，cms 应该具有：

1. 易理解
2. 易学习
3. 易操作
4. 易用性和功能性

而这些都没有体现系统中的功能逻辑，所以在选型时难免很难做出选择。首先，不管你如何选型，一旦选择了开源社区的 cms 系统，必须是有一些点让你觉得该系统符合客户提出的需求，同时，开发者也要对该系统中的技术栈熟练掌握。

## 权限管理

1. 实现权限管理的方式很多，一般有‘后端返回路由让前端拼接’，‘后端返回身份让前端拼接’等等。
2. 本系统借鉴了‘lin_cms’团队的权限管理思想。采用了权限分组形式，使用者只能看到属于你的分组的页面信息，同时与后端联合规范了接口权限访问权限。

## 国际化

1. 使用常见的 i18n 实现国际化。这个看需求

## 主题

1. 一般的 cms 系统都会推出主题系统。我不推崇完全的自定义化主题，因为这样往往只是让用户改变一个主色，并不符合一致性，而多色自定义又比较不符合易用性。而是在开发时采用多套完整的主题色调。
2. 在`:root`中定义全局色彩
3. 结合 scss 配置多套主题色彩，通过顶级类名替换样式

## 提交规范

提交 commit 请执行 pnpm commit

## package.json 解析

<!-- 请及时保持更新此文件 -->

```json
{
	"name": "vite-cms", //名称
	"version": "0.0.1", //版本
	"description": "基于 Vue3、TypeScript、Pinia 和 Vite 等主流技术的cms解決方案",
	"scripts": {
		"dev": "vite --mode development",
		"build:dev": "vue-tsc --noEmit && vite build --mode development",
		"build:prod": "vue-tsc --noEmit && vite build --mode production",
		"preview": "vite preview",
		"style": "stylelint \"src/**/*.(vue|scss|css)\" --fix",
		"lint": "pnpm lint:eslint && pnpm lint:prettier",
		"lint:eslint": "eslint \"src/**/*.{vue,ts,tsx}\" --fix",
		"lint:prettier": "prettier --write  \"src/**/*.{js,json,tsx,ts,css,less,scss,vue,html,md}\"",
		"prepare": "husky install",
		"commit": "git-cz"
	},
	"dependencies": {
		"@element-plus/icons-vue": "^2.0.10", //element-plus图标
		"@tinymce/tinymce-vue": "^5.0.0", //富文本编辑器
		"@vueuse/core": "^9.6.0", //vueuse工具库
		"axios": "^1.1.3", //axios请求封装
		"dayjs": "^1.11.7", //日期管理库
		"element-plus": "^2.2.18", //组件库
		"lodash-es": "^4.17.21", //lodash-es工具库
		"path-browserify": "^1.0.1", //解析浏览器路径
		"path-to-regexp": "^6.2.1", //解析浏览器路径
		"pinia": "^2.0.23", //状态管理库
		"tinymce": "6.2.0", //原生富文本编辑器
		"vue": "3.2.41", //vue框架
		"vue-i18n": "9.3.0-beta.6", //国际化插件
		"vue-router": "^4.1.5" //vue官方路由
	},
	"devDependencies": {
		"@commitlint/cli": "^17.1.2",
		"@commitlint/config-conventional": "^17.1.0",
		"@types/lodash-es": "^4.17.6",
		"@types/node": "18.8.0",
		"@types/path-browserify": "^1.0.0",
		"@typescript-eslint/eslint-plugin": "^5.40.0",
		"@typescript-eslint/parser": "^5.40.0",
		"@unocss/preset-rem-to-px": "^0.46.3",
		"@vitejs/plugin-vue": "3.1.0",
		"@vue/eslint-config-prettier": "^7.0.0",
		"@vue/eslint-config-typescript": "^11.0.2",
		"commitizen": "^4.2.5",
		"cz-conventional-changelog": "^3.3.0",
		"cz-customizable": "^7.0.0",
		"eslint": "^8.25.0",
		"eslint-plugin-prettier": "^4.2.1",
		"eslint-plugin-vue": "^9.6.0",
		"husky": "^8.0.1",
		"lint-staged": "^13.0.3",
		"pinia-plugin-persist": "^1.0.0",
		"pinia-plugin-persistedstate": "^2.3.0",
		"postcss": "^8.4.18",
		"postcss-html": "^1.5.0",
		"postcss-scss": "^4.0.5",
		"prettier": "^2.7.1",
		"sass": "^1.55.0",
		"stylelint": "14.14.0",
		"stylelint-config-prettier": "^9.0.3",
		"stylelint-config-recommended-vue": "^1.4.0",
		"stylelint-config-standard": "^29.0.0",
		"stylelint-config-standard-scss": "^5.0.0",
		"stylelint-order": "^5.0.0",
		"stylelint-scss": "^4.3.0",
		"terser": "^5.15.1",
		"typescript": "4.6.4",
		"unocss": "^0.46.1",
		"vite": "3.1.0",
		"vite-plugin-compression": "^0.5.1",
		"vite-plugin-svg-icons": "^2.0.1",
		"vite-svg-loader": "^3.6.0",
		"vue-eslint-parser": "^9.1.0",
		"vue-tsc": "^1.0.11"
	},
	"lint-staged": {
		"*.{js,jsx,vue,ts,tsx}": ["eslint --fix", "prettier --write"],
		"*.{scss,less,css,html,md}": ["prettier --write"],
		"package.json": ["prettier --write"],
		"{!(package)*.json,.!(browserslist)*rc}": ["prettier --write--parser json"]
	},
	"config": {
		"commitizen": {
			"path": "node_modules/cz-customizable"
		},
		"cz-customizable": {
			"config": "commitlint.config.cjs"
		}
	},
	"keywords": ["vue", "element-plus", "vue3", "ts", "admin", "typescript"],
	"license": "MIT"
}
```
