import { ELoadableTypes, IPluginOptions } from "../../types";
import { HammerClassDecorator } from "../ClassDecorator";

export const Plugin = HammerClassDecorator<IPluginOptions>(
	ELoadableTypes.PLUGIN,
);
