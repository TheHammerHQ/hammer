import { ELoadableTypes } from "src";
import type { ILoadable } from "../types/index.d.ts";
import { configure } from "../utils";

export const HammerClassDecorator = <T>(type: ELoadableTypes) => {
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
