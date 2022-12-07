import { ELoadableTypes, HammerClassDecorator } from "@hammerhq/core";
import { ECommandType, ICommandOptions } from "./types";

export const Command = HammerClassDecorator<ICommandOptions>(
	ECommandType.SLASH_COMMAND as unknown as ELoadableTypes,
);
