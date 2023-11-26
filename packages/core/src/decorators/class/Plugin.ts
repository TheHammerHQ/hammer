import { ELoadableTypes } from "src";
import type { IPluginOptions } from "../../types/index.d.ts";
import { HammerClassDecorator } from "../ClassDecorator";

export const Plugin = HammerClassDecorator<IPluginOptions>(
	ELoadableTypes.PLUGIN,
);
