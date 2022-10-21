import { defineConfig } from "taze";

export default defineConfig({
	exclude: ["chalk", "@hammerhq/*"],
	recursive: true,
	force: true,
});
