import { ILoadable } from "../types";
import { configCache } from "./globals";

export const defineConfig = <T>(loadable: ILoadable, config: T) =>
	configCache.set(loadable.name, config);
