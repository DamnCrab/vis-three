import { defineConfig } from "vite";
import { name } from "./package.json";
const pkg = name.split("/").pop();
export default defineConfig({
    build: {
        lib: {
            entry: "./index.ts",
            name: `vis-three.${pkg}`,
        },
        rollupOptions: {
            output: {
                entryFileNames: `vis-three.${pkg}.[format].js`,
            },
            external: [new RegExp("^three")],
            plugins: [],
        },
    },
});
