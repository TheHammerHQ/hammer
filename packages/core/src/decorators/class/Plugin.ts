import { ELoadableTypes, IPluginOptions } from "../../types";
import { ClassDecorator } from "../ClassDecorator";

export const Plugin = ClassDecorator<IPluginOptions>(ELoadableTypes.PLUGIN);
