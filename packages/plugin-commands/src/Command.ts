import { ELoadableTypes, HammerClassDecorator } from "@hammerhq/core";
import { ECommandType } from "./enums";
import type { ICommandOptions } from "./types.d.ts";

export const Command = HammerClassDecorator<ICommandOptions>(
	ECommandType.SLASH_COMMAND as unknown as ELoadableTypes,
);
