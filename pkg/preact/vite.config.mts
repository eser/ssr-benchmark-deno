import * as vite from "npm:vite@^5.2.8";
import * as preactPresetVite from "npm:@preact/preset-vite@^2.8.2";

import "npm:@babel/plugin-transform-react-jsx";
import "npm:preact/jsx-runtime";

export default vite.defineConfig({
  plugins: [preactPresetVite.preact({
    devToolsEnabled: false,
    prefreshEnabled: false,
    reactAliasesEnabled: false,
    babel: {
      plugins: [],
    },
    jsxImportSource: "npm:preact",
    prerender: {
      enabled: false,
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
