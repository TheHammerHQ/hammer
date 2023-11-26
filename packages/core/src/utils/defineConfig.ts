import type { ILoadable } from "../types/index.d.ts";
import { configCache } from "./globals";

export const defineConfig = <T>(loadable: ILoadable, config: T) =>
	configCache.set(loadable.name, config);
