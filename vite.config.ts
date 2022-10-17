import { loadEnv, ConfigEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
  //
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const { VITE_PUBLIC_PATH } = viteEnv;
  return <UserConfigExport>{
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    //文件别名
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__dirname, "./src"),
      },
    },
    //service
    //build
    /** 消除打包大小超过 500kb 警告 */
    chunkSizeWarningLimit: 2000,
    /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
    minify: "terser",
    /** 在打包代码时移除 console.log、debugger 和 注释 */
    terserOptions: {
      compress: {
        drop_console: false, //不删除【console.】,可能你需要用到一些error提示
        drop_debugger: true,
        pure_funcs: ["console.log"], //删除console.log
      },
      format: {
        //删除注释
        comments: true,
      },
      /** 打包后静态资源目录,慎重配置 */
      assetsDir: "static",
    },
    //viter插件
    plugins: [vue()],
  };
};
