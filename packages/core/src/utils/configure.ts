import type { ILoadable } from "../types/index.d.ts";

export const configure = (loadable: ILoadable, options: object) => {
	const oldOptions = Reflect.getMetadata("options", loadable) || {};
	const newOptions = { ...oldOptions, ...options };

	Reflect.defineMetadata("options", newOptions, loadable);

	return loadable;
};
