import { ETypes, IServiceOptions } from "../../types";
import { ClassDecorator } from "../ClassDecorator";

export const Service = ClassDecorator<IServiceOptions>(ETypes.SERVICE);
