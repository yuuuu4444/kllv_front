import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue(), vueDevTools()],
    base: env.VITE_BASE || '/',
    build: {
      outDir: env.VITE_OUT_DIR || 'dist',
    },

    css: {
      preprocessorOptions: {
        scss: {
          // 這裡的路徑，會被自動加到每一個 .vue 檔案的 <style lang="scss"> 的最前面
          additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixin.scss";
        `,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});

// import { fileURLToPath, URL } from 'node:url';

// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import vueDevTools from 'vite-plugin-vue-devtools';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueDevTools()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         // 這裡的路徑，會被自動加到每一個 .vue 檔案的 <style lang="scss"> 的最前面
//         additionalData: `
//           @import "@/assets/scss/_variables.scss";
//           @import "@/assets/scss/_mixin.scss";
//         `,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
// });
