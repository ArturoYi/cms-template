module.exports = {
	//優先；注意：配置文件中的最后一个覆盖块始终具有最高优先级
	root: true,
	//主要是控制下面order/properties-order的規則
	plugins: ["stylelint-order"],
	/**
	 * 繼承官方的一些配置，注意後面會覆蓋前面的
	 * stylelint-config-standard:可選的，官方規則擴展,參考：https://github.com/stylelint/stylelint-config-standard/blob/main/index.js
	 * stylelint-config-standard-scss:適配scss語法
	 * stylelint-config-prettier：可選，避免於prettier衝突
	 */
	extends: ["stylelint-config-standard", "stylelint-config-standard-scss", "stylelint-config-prettier"],
	//忽略不要校驗的文件
	ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json"],
	// 針對指定文件採用指定配置
	overrides: [
		/**
		 * 你也可以使用下面兩個擴展：（也基於postcss-html）
		 * "stylelint-config-recommended", "stylelint-config-html"
		 * 但是都需要增加一些適配
		 *
		 */
		{
			files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
			customSyntax: "postcss-html",
			extends: ["stylelint-config-recommended"],
			rules: {
				"keyframes-name-pattern": null,
				"selector-pseudo-class-no-unknown": [
					true,
					{
						ignorePseudoClasses: ["deep", "global"]
					}
				],
				"selector-pseudo-element-no-unknown": [
					true,
					{
						ignorePseudoElements: ["v-bind", "v-deep", "v-global", "v-slotted"]
					}
				],
				"function-no-unknown": [
					true,
					{
						ignoreFunctions: ["v-bind"]
					}
				],
				"no-descending-specificity": null
			}
		}
	],
	//覆蓋上面的規則，注意下面的所有配置都會覆蓋上面插件的默認配置
	rules: {
		// 屬性名規則，暫時沒法辦法，只能全部放行
		"selector-class-pattern": null,
		//禁止将特异性较低的选择器覆盖特异性较高的选择器,放行
		"no-descending-specificity": null,
		// 配置一些適配scss函數，否則通過不了校驗
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: ["use", "function", "if", "each", "include", "mixin"]
			}
		],
		//可用的css屬性的書寫順序
		"order/properties-order": [
			//指定css属性顺序，此顺序参考腾讯imweb团队推荐规则
			"display",
			"visibility",
			"float",
			"clear",
			"overflow",
			"overflow-x",
			"overflow-y",
			"clip",
			"zoom",

			"table-layout",
			"empty-cells",
			"caption-side",
			"border-spacing",
			"border-collapse",
			"list-style",
			"list-style-position",
			"list-style-type",
			"list-style-image",

			"-webkit-box-orient",
			"-webkit-box-direction",
			"-webkit-box-decoration-break",
			"-webkit-box-pack",
			"-webkit-box-align",
			"-webkit-box-flex",

			"position",
			"top",
			"right",
			"bottom",
			"left",
			"z-index",

			"margin",
			"margin-top",
			"margin-right",
			"margin-bottom",
			"margin-left",
			"-webkit-box-sizing",
			"-moz-box-sizing",
			"box-sizing",
			"border",
			"border-width",
			"border-style",
			"border-color",
			"border-top",
			"border-top-width",
			"border-top-style",
			"border-top-color",
			"border-right",
			"border-right-width",
			"border-right-style",
			"border-right-color",
			"border-bottom",
			"border-bottom-width",
			"border-bottom-style",
			"border-bottom-color",
			"border-left",
			"border-left-width",
			"border-left-style",
			"border-left-color",
			"-webkit-border-radius",
			"-moz-border-radius",
			"border-radius",
			"-webkit-border-top-left-radius",
			"-moz-border-radius-topleft",
			"border-top-left-radius",
			"-webkit-border-top-right-radius",
			"-moz-border-radius-topright",
			"border-top-right-radius",
			"-webkit-border-bottom-right-radius",
			"-moz-border-radius-bottomright",
			"border-bottom-right-radius",
			"-webkit-border-bottom-left-radius",
			"-moz-border-radius-bottomleft",
			"border-bottom-left-radius",
			"-webkit-border-image",
			"-moz-border-image",
			"-o-border-image",
			"border-image",
			"-webkit-border-image-source",
			"-moz-border-image-source",
			"-o-border-image-source",
			"border-image-source",
			"-webkit-border-image-slice",
			"-moz-border-image-slice",
			"-o-border-image-slice",
			"border-image-slice",
			"-webkit-border-image-width",
			"-moz-border-image-width",
			"-o-border-image-width",
			"border-image-width",
			"-webkit-border-image-outset",
			"-moz-border-image-outset",
			"-o-border-image-outset",
			"border-image-outset",
			"-webkit-border-image-repeat",
			"-moz-border-image-repeat",
			"-o-border-image-repeat",
			"border-image-repeat",
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

			"font",
			"font-family",
			"font-size",
			"font-weight",
			"font-style",
			"font-variant",
			"font-size-adjust",
			"font-stretch",
			"font-effect",
			"font-emphasize",
			"font-emphasize-position",
			"font-emphasize-style",
			"font-smooth",
			"line-height",
			"text-align",
			"-webkit-text-align-last",
			"-moz-text-align-last",
			"-ms-text-align-last",
			"text-align-last",
			"vertical-align",
			"white-space",
			"text-decoration",
			"text-emphasis",
			"text-emphasis-color",
			"text-emphasis-style",
			"text-emphasis-position",
			"text-indent",
			"-ms-text-justify",
			"text-justify",
			"letter-spacing",
			"word-spacing",
			"-ms-writing-mode",
			"text-outline",
			"text-transform",
			"text-wrap",
			"-ms-text-overflow",
			"text-overflow",
			"text-overflow-ellipsis",
			"text-overflow-mode",
			"-ms-word-wrap",
			"word-wrap",
			"-ms-word-break",
			"word-break",

			"color",
			"background",
			"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
			"background-color",
			"background-image",
			"background-repeat",
			"background-attachment",
			"background-position",
			"-ms-background-position-x",
			"background-position-x",
			"-ms-background-position-y",
			"background-position-y",
			"-webkit-background-clip",
			"-moz-background-clip",
			"background-clip",
			"background-origin",
			"-webkit-background-size",
			"-moz-background-size",
			"-o-background-size",
			"background-size",

			"outline",
			"outline-width",
			"outline-style",
			"outline-color",
			"outline-offset",
			"opacity",
			"filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
			"-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
			"-ms-interpolation-mode",
			"-webkit-box-shadow",
			"-moz-box-shadow",
			"box-shadow",
			"filter:progid:DXImageTransform.Microsoft.gradient",
			"-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
			"text-shadow",

			"-webkit-transition",
			"-moz-transition",
			"-ms-transition",
			"-o-transition",
			"transition",
			"-webkit-transition-delay",
			"-moz-transition-delay",
			"-ms-transition-delay",
			"-o-transition-delay",
			"transition-delay",
			"-webkit-transition-timing-function",
			"-moz-transition-timing-function",
			"-ms-transition-timing-function",
			"-o-transition-timing-function",
			"transition-timing-function",
			"-webkit-transition-duration",
			"-moz-transition-duration",
			"-ms-transition-duration",
			"-o-transition-duration",
			"transition-duration",
			"-webkit-transition-property",
			"-moz-transition-property",
			"-ms-transition-property",
			"-o-transition-property",
			"transition-property",
			"-webkit-transform",
			"-moz-transform",
			"-ms-transform",
			"-o-transform",
			"transform",
			"-webkit-transform-origin",
			"-moz-transform-origin",
			"-ms-transform-origin",
			"-o-transform-origin",
			"transform-origin",
			"-webkit-animation",
			"-moz-animation",
			"-ms-animation",
			"-o-animation",
			"animation",
			"-webkit-animation-name",
			"-moz-animation-name",
			"-ms-animation-name",
			"-o-animation-name",
			"animation-name",
			"-webkit-animation-duration",
			"-moz-animation-duration",
			"-ms-animation-duration",
			"-o-animation-duration",
			"animation-duration",
			"-webkit-animation-play-state",
			"-moz-animation-play-state",
			"-ms-animation-play-state",
			"-o-animation-play-state",
			"animation-play-state",
			"-webkit-animation-timing-function",
			"-moz-animation-timing-function",
			"-ms-animation-timing-function",
			"-o-animation-timing-function",
			"animation-timing-function",
			"-webkit-animation-delay",
			"-moz-animation-delay",
			"-ms-animation-delay",
			"-o-animation-delay",
			"animation-delay",
			"-webkit-animation-iteration-count",
			"-moz-animation-iteration-count",
			"-ms-animation-iteration-count",
			"-o-animation-iteration-count",
			"animation-iteration-count",
			"-webkit-animation-direction",
			"-moz-animation-direction",
			"-ms-animation-direction",
			"-o-animation-direction",
			"animation-direction",

			"content",
			"quotes",
			"counter-reset",
			"counter-increment",
			"resize",
			"cursor",
			"-webkit-user-select",
			"-moz-user-select",
			"-ms-user-select",
			"user-select",
			"nav-index",
			"nav-up",
			"nav-right",
			"nav-down",
			"nav-left",
			"-moz-tab-size",
			"-o-tab-size",
			"tab-size",
			"-webkit-hyphens",
			"-moz-hyphens",
			"hyphens",
			"pointer-events"
		]
	}
	// overrides: [
	// 	{
	// 		files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
	// 		extends: ["stylelint-config-recommended", "stylelint-config-html"],
	// 		customSyntax: "postcss-html",
	// 		rules: {
	// 			"keyframes-name-pattern": null,
	// 			"selector-pseudo-class-no-unknown": [
	// 				true,
	// 				{
	// 					ignorePseudoClasses: ["deep", "global"]
	// 				}
	// 			],
	// 			"selector-pseudo-element-no-unknown": [
	// 				true,
	// 				{
	// 					ignorePseudoElements: ["v-deep", "v-global", "v-slotted"]
	// 				}
	// 			]
	// 		}
	// 	}
	// ],
	// //
	// plugins: ["stylelint-order", "stylelint-scss"],
	// rules: {
	// 	// 命名规范 -"^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
	// 	"selector-class-pattern": [
	// 		"^([a-z_-][a-z0-9_-]*)([_-a-z0-9]+)*$",
	// 		{
	// 			message: "類名只能kebab-case"
	// 		}
	// 	],
	// 	//  颜色指定大写
	// 	"color-hex-case": "upper",
	// 	// 禁止空块
	// 	"block-no-empty": true,
	// 	// 颜色6位长度
	// 	"color-hex-length": "long",
	// 	// 兼容自定义标签名
	// 	"selector-type-no-unknown": [
	// 		true,
	// 		{
	// 			ignoreTypes: []
	// 		}
	// 	],
	// 	// 忽略伪类选择器 ::v-deep
	// 	"selector-pseudo-element-no-unknown": [
	// 		true,
	// 		{
	// 			ignorePseudoElements: ["v-deep"]
	// 		}
	// 	],
	// 	// scss函数配置
	// 	"scss/no-global-function-names": true,
	// 	"scss/at-rule-no-unknown": true,
	// 	// 	 禁止低优先级的选择器出现在高优先级的选择器之后。
	// 	"no-descending-specificity": null,
	// 	// 	 不验证@未知的名字，为了兼容scss的函数
	// 	"at-rule-no-unknown": [
	// 		true,
	// 		{
	// 			ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen", "function", "if", "each", "include", "mixin"]
	// 		}
	// 	],
	// 	// 	 禁止空注释
	// 	"comment-no-empty": true,
	// 	// 	 禁止简写属性的冗余值
	// 	"shorthand-property-no-redundant-values": true,
	// 	// 	 禁止值的浏览器引擎前缀
	// 	"value-no-vendor-prefix": true,
	// 	// 	 property-no-vendor-prefix
	// 	"property-no-vendor-prefix": true,
	// 	// 	 禁止小于 1 的小数有一个前导零
	// 	"number-leading-zero": "never",
	// 	// 禁止空第一行
	// 	"no-empty-first-line": true,
	// 	// 未知函數
	// 	"function-no-unknown": [true, { ignoreFunctions: ["v-bind"] }],
	// 	// 属性的排序
	// 	"order/properties-order": [
	// 		"position",
	// 		"top",
	// 		"right",
	// 		"bottom",
	// 		"left",
	// 		"z-index",
	// 		"display",
	// 		"justify-content",
	// 		"align-items",
	// 		"float",
	// 		"clear",
	// 		"overflow",
	// 		"overflow-x",
	// 		"overflow-y",
	// 		"margin",
	// 		"margin-top",
	// 		"margin-right",
	// 		"margin-bottom",
	// 		"margin-left",
	// 		"border",
	// 		"border-style",
	// 		"border-width",
	// 		"border-color",
	// 		"border-top",
	// 		"border-top-style",
	// 		"border-top-width",
	// 		"border-top-color",
	// 		"border-right",
	// 		"border-right-style",
	// 		"border-right-width",
	// 		"border-right-color",
	// 		"border-bottom",
	// 		"border-bottom-style",
	// 		"border-bottom-width",
	// 		"border-bottom-color",
	// 		"border-left",
	// 		"border-left-style",
	// 		"border-left-width",
	// 		"border-left-color",
	// 		"border-radius",
	// 		"padding",
	// 		"padding-top",
	// 		"padding-right",
	// 		"padding-bottom",
	// 		"padding-left",
	// 		"width",
	// 		"min-width",
	// 		"max-width",
	// 		"height",
	// 		"min-height",
	// 		"max-height",
	// 		"font-size",
	// 		"font-family",
	// 		"font-weight",
	// 		"text-align",
	// 		"text-justify",
	// 		"text-indent",
	// 		"text-overflow",
	// 		"text-decoration",
	// 		"white-space",
	// 		"color",
	// 		"background",
	// 		"background-position",
	// 		"background-repeat",
	// 		"background-size",
	// 		"background-color",
	// 		"background-clip",
	// 		"opacity",
	// 		"filter",
	// 		"list-style",
	// 		"outline",
	// 		"visibility",
	// 		"box-shadow",
	// 		"text-shadow",
	// 		"resize",
	// 		"transition"
	// 	]
	// }
};
