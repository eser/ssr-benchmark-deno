import * as vite from "npm:vite@^5.2.8";
import * as vitePluginSolid from "npm:vite-plugin-solid@^2.10.2";

export default vite.defineConfig({
  plugins: [vitePluginSolid.default({
    ssr: true,
    solid: {
      moduleName: "npm:solid-js/web",
    },
  })],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    target: "esnext",
  },
});
