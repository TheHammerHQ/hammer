import { ETypes, IServiceOptions } from "../types";

export const Service = (options?: IServiceOptions) => {
	const decorator: ClassDecorator = (target) => {
		Reflect.defineMetadata("type", ETypes.SERVICE, target);
		Reflect.defineMetadata("service", options, target);
	};

	return decorator;
};
