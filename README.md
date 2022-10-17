# Vue 3 + TypeScript + Vite的cms

# package.json

```json
{
  //注意package.json不能写注释，下面注释只为方便阅读添加
  "name": "vite-cms",
  "version": "0.0.1",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  //下面依赖会被打包进生产环境--先固定版本
  "dependencies": {
    "element-plus": "2.2.18",
    "vue": "3.2.37",
    "vue-router": "4.1.5"
  },
  //开发环境依赖--先固定版本
  "devDependencies": {
    "@types/node": "18.11.0",
    "@vitejs/plugin-vue": "3.1.0",
    "typescript": "4.6.4",
    "vite": "3.1.0",
    "vue-tsc": "0.40.4"
  },
  //lint-staged只检查本次修改更新的代码，并在出现错误的时候，自动修复并且推送
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
  //可以帮助人们在使用npm search时找到这个包,没什么用
  "keywords": [
    "vue",
    "element-plus",
    "vue3",
    "ts",
    "admin",
    "typescript"
  ],
  //指定许可证
  "license": "MIT"
}
```