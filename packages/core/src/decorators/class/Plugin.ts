import { ETypes, IPluginOptions } from "../../types";
import { ClassDecorator } from "../ClassDecorator";

export const Plugin = ClassDecorator<IPluginOptions>(ETypes.PLUGIN);
