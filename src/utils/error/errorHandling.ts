// import { ComponentPublicInstance } from "vue";
export {};
// /**
//  * 处理vue内部错误
//  */
// function errorWidthHandler(err: unknown, vm: ComponentPublicInstance | null, info: any) {
// 	console.log(err, vm, info);
// }
// /**
//  * 处理vue内部错误
//  */
// function isPromise(res: Promise<any>) {
// 	return res && typeof res.then === "function" && typeof res.catch === "function";
// }
// const handleMethods = (instance) => {
// 	if (instance.$options.methods) {
// 		const actions = instance.$options.methods || {};
// 		for (const key in actions) {
// 			if (Object.hasOwnProperty.call(actions, key)) {
// 				const fn = actions[key];
// 				actions[key] = function (...args) {
// 					const ret = args.length > 0 ? fn.apply(this, args) : fn.call(this);
// 					if (isPromise(ret) && !ret._handled) {
// 						ret._handled = true;
// 						return ret.catch((e) => errorHandler(e, this, `捕获到了未处理的Promise异常： (Promise/async)`));
// 					}
// 				};
// 			}
// 		}
// 	}
// };

// export default GlobalError = () => {
// 	window.onerror = function (message, source, line, column, error) {
// 		console.log(message, source, line, column, error);
// 		errorWidthHandler(message, null, "全局捕获错误");
// 		// console.log('全局捕获错误', message, source, line, column, error)
// 	};
// 	window.addEventListener("unhandledrejection", (event) => {
// 		errorWidthHandler(event, null, "全局捕获未处理的Promise异常");
// 	});
// };
