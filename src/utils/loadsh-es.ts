/** 這裡也沒怎麼用，先記錄 **/
import throttle from "lodash-es/throttle";
import debounce from "lodash-es/debounce";
import clone from "lodash-es/clone";
import cloneDeep from "lodash-es/cloneDeep";
import isNaN from "lodash-es/isNaN";
/**
 * throttle(...)
 * func (Function): 要节流的函数。
 * [wait=0] (number): 需要节流的毫秒。
 * [options=] (Object): 选项对象。
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 * */
/**
 * debounce(...)
 * func (Function): 要防抖动的函数。
 *[wait=0] (number): 需要延迟的毫秒数。
 *[options=] (Object): 选项对象。
 *[options.leading=false] (boolean): 指定在延迟开始前调用。
 *[options.maxWait] (number): 设置 func 允许被延迟的最大值。
 *[options.trailing=true] (boolean): 指定在延迟结束后调用。
 **/
export default { throttle, debounce, clone, cloneDeep, isNaN };
