module.exports = {
	root: true,
	extends: ["stylelint-config-standard", "stylelint-config-standard-scss", "stylelint-config-recommended-vue", "stylelint-config-prettier"],
	customSyntax: "postcss-html",
	overrides: [
		{
			files: ["**/*.{scss,css,sass}"], // css 相关文件由 postcss-scss 处理
			customSyntax: "postcss-scss"
		},
		{
			files: ["**/*.{vue}"], // css 相关文件由 postcss-scss 处理
			customSyntax: "postcss-html"
		}
	],
	//
	plugins: ["stylelint-order", "stylelint-scss"],
	rules: {
		// // 命名规范 -"^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
		"selector-class-pattern": [
			"^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
			{
				message: "Expected class selector to be kebab-case"
			}
		],
		// 	// 颜色指定大写
		// "color-hex-case": "upper",
		// 	// 禁止空块
		"block-no-empty": true,
		// 	// 颜色6位长度
		"color-hex-length": "long",
		// 兼容自定义标签名
		"selector-type-no-unknown": [
			true,
			{
				ignoreTypes: []
			}
		],
		// 忽略伪类选择器 ::v-deep
		"selector-pseudo-element-no-unknown": [
			true,
			{
				ignorePseudoElements: ["v-deep"]
			}
		],
		// scss函数配置
		"scss/no-global-function-names": true,
		"scss/at-rule-no-unknown": true,
		// 	// 禁止低优先级的选择器出现在高优先级的选择器之后。
		"no-descending-specificity": null,
		// 	// 不验证@未知的名字，为了兼容scss的函数
		"at-rule-no-unknown": null,
		// 	// 禁止空注释
		"comment-no-empty": true,
		// 	// 禁止简写属性的冗余值
		"shorthand-property-no-redundant-values": true,
		// 	// 禁止值的浏览器引擎前缀
		"value-no-vendor-prefix": true,
		// 	// property-no-vendor-prefix
		"property-no-vendor-prefix": true,
		// 	// 禁止小于 1 的小数有一个前导零
		// "number-leading-zero": "never",
		// 禁止空第一行
		"no-empty-first-line": true,
		// 属性的排序
		"order/properties-order": [
			"position",
			"top",
			"right",
			"bottom",
			"left",
			"z-index",
			"display",
			"justify-content",
			"align-items",
			"float",
			"clear",
			"overflow",
			"overflow-x",
			"overflow-y",
			"margin",
			"margin-top",
			"margin-right",
			"margin-bottom",
			"margin-left",
			"border",
			"border-style",
			"border-width",
			"border-color",
			"border-top",
			"border-top-style",
			"border-top-width",
			"border-top-color",
			"border-right",
			"border-right-style",
			"border-right-width",
			"border-right-color",
			"border-bottom",
			"border-bottom-style",
			"border-bottom-width",
			"border-bottom-color",
			"border-left",
			"border-left-style",
			"border-left-width",
			"border-left-color",
			"border-radius",
			"padding",
			"padding-top",
			"padding-right",
			"padding-bottom",
			"padding-left",
			"width",
			"min-width",
			"max-width",
			"height",
			"min-height",
			"max-height",
			"font-size",
			"font-family",
			"font-weight",
			"text-align",
			"text-justify",
			"text-indent",
			"text-overflow",
			"text-decoration",
			"white-space",
			"color",
			"background",
			"background-position",
			"background-repeat",
			"background-size",
			"background-color",
			"background-clip",
			"opacity",
			"filter",
			"list-style",
			"outline",
			"visibility",
			"box-shadow",
			"text-shadow",
			"resize",
			"transition"
		]
	}
};
