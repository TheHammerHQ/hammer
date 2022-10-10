import { ELoadableTypes, ILoadable } from "../types";
import { configure } from "../utils";

export const ClassDecorator = <T>(type: ELoadableTypes) => {
	return (options: T) => {
		const decorator: ClassDecorator = (target) => {
			configure(
				target as unknown as ILoadable,
				options as unknown as object,
			);

			Reflect.defineMetadata("type", type, target);
		};

		return decorator;
	};
};
