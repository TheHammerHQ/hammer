import { EHTTPServiceType } from "./enums";

export const Controller = (prefix?: string) => {
	const decorator: ClassDecorator = (target) => {
		Reflect.defineMetadata("type", EHTTPServiceType.CONTROLLER, target);

		Reflect.defineMetadata("prefix", prefix, target);
		if (!Reflect.hasMetadata("routes", target))
			Reflect.defineMetadata("routes", [], target);
	};

	return decorator;
};
