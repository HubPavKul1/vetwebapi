Настройка для алиесов в импортах

```js

//ts.config

{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    //изменения в конфиге для алиесов
    "baseUrl": "src",
    "paths": {
      "components/*": ["components/*"],
      "hooks/*": ["hooks/*"],
      "interfaces/*": ["interfaces/*"],
      "pages/*": ["pages/*"],  
      "urls/*": ["urls/*"],
      "assets/*": ["assets/*"],
      "services/*": ["services/*"],
      "data/*": ["data/*"]
    },


    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```
Внести изменения в vite.config.ts
```js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
    proxy: {
      // "/api": "http://192.168.99.101:8000"
      "/api": "http://localhost:8000",
    },
  },
  plugins: [react()],
  // добавить resolve
  resolve: {
    alias: {
      components: "/src/components",
      hooks: "/src/hooks",
      interfaces: "/src/interfaces",
      pages: "/src/pages",
      urls: "/src/urls",
      assets: "/src/assets",
      services: "/src/services",
      data: "/src/data"
    },
  },
});

```