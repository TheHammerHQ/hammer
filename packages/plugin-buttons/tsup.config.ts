import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	minify: true,
	dts: true,
	treeshake: true,
});
