import { ECommandType, ICommandOptions } from "./types";

export const Command = (config: ICommandOptions) => {
	const decorator: ClassDecorator = (target) => {
		Reflect.defineMetadata("options", config, target);

		Reflect.defineMetadata("type", ECommandType.SLASH_COMMAND, target);
	};

	return decorator;
};
