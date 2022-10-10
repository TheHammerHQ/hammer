import { ELoadableTypes, ILoadable } from "../types";

export const checkType = (loadable: ILoadable, type: ELoadableTypes) => {
	const t = Reflect.getMetadata("type", loadable);
	if (t != type)
		throw new Error(
			`Invalid type for ${loadable.name}, expected ${type} but got ${t}`,
		);
};
