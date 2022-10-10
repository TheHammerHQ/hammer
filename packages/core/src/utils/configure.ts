import { ILoadable } from "../types";

export const configure = (loadable: ILoadable, options: object) => {
	console.log(loadable);

	const oldOptions = Reflect.getMetadata("options", loadable) || {};
	const newOptions = { ...oldOptions, ...options };

	Reflect.defineMetadata("options", newOptions, loadable);

	return loadable;
};
