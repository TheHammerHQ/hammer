import { ETypes, IPluginOptions } from "../types";

export const Plugin = (options: IPluginOptions) => {
	const decorator: ClassDecorator = (target) => {
		Reflect.defineMetadata("type", ETypes.PLUGIN, target);
		Reflect.defineMetadata("plugin", options, target);
	};

	return decorator;
};
