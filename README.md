# Vue 3 + TypeScript + Vite 的 cms

# 推荐使用 pnpm

# 简繁体转换在线

https://jf.xmu.edu.cn/online.html

# package.json

```json
{
{
	"name": "vite-cms",
	"version": "0.0.1",
	"scripts": {
		"dev": "vite",
		"build": "vue-tsc --noEmit && vite build",
		"preview": "vite preview",
		"lint": "pnpm lint:eslint && pnpm lint:prettier",
		"lint:eslint": "eslint \"src/**/*.{vue,ts,tsx}\" --fix",
		"lint:prettier": "prettier --write  \"src/**/*.{js,json,tsx,css,less,scss,vue,html,md}\"",
		"prepare": "husky install",
		"commit": "git-cz"
	},
	"dependencies": {
		"element-plus": "2.2.18",
		"vue": "3.2.37",
		"vue-router": "4.1.5"
	},
	"devDependencies": {
		"@commitlint/cli": "^17.1.2",
		"@commitlint/config-conventional": "^17.1.0",
		"@types/node": "18.11.0",
		"@typescript-eslint/eslint-plugin": "^5.40.0",
		"@typescript-eslint/parser": "^5.40.0",
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
		"prettier": "^2.7.1",
		"typescript": "4.6.4",
		"vite": "3.1.0",
		"vue-eslint-parser": "^9.1.0",
		"vue-tsc": "0.40.4"
	},
	"lint-staged": {
		"*.{js,jsx,vue,ts,tsx}": [
			"eslint --fix",
			"prettier --write"
		],
		"*.{scss,less,css,html,md}": [
			"prettier --write"
		],
		"package.json": [
			"prettier --write"
		],
		"{!(package)*.json,.!(browserslist)*rc}": [
			"prettier --write--parser json"
		]
	},
	"config": {
		"commitizen": {
			"path": "node_modules/cz-customizable"
		},
		"cz-customizable": {
			"config": "commitlint.config.js"
		}
	},
	"keywords": [
		"vue",
		"element-plus",
		"vue3",
		"ts",
		"admin",
		"typescript"
	],
	"license": "MIT"
}
```
