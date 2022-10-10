import { ELoadableTypes, IServiceOptions } from "../../types";
import { ClassDecorator } from "../ClassDecorator";

export const Service = ClassDecorator<IServiceOptions>(ELoadableTypes.SERVICE);
