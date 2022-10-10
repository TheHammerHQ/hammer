import { ETypes } from "../types";

export const ClassDecorator = <T>(type: ETypes) => {
	return (options: T) => {
		const decorator: ClassDecorator = (target) => {
			Reflect.defineMetadata("type", type, target);
			Reflect.defineMetadata("options", options, target);
		};

		return decorator;
	};
};
