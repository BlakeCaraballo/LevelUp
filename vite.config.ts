import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default {
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // 👈 This suppresses warnings from node_modules
      },
    },
  },
};
