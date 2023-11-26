import { ELoadableTypes, HammerClassDecorator } from "@hammerhq/core";
import { EButtonType } from "./enums";
import type { IButtonOptions } from "./types.d.ts";

export const Command = HammerClassDecorator<IButtonOptions>(
	EButtonType.SIMPLE_BUTTON as unknown as ELoadableTypes,
);
