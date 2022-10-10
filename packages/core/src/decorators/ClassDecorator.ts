import { ELoadableTypes } from "src/types";

export const ClassDecorator = <T>(type: ELoadableTypes) => {
	return (options: T) => {
		const decorator: ClassDecorator = (target) => {
			Reflect.defineMetadata("type", type, target);
			Reflect.defineMetadata("options", options, target);
		};

		return decorator;
	};
};
