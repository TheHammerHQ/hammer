import { ELoadableTypes, IServiceOptions } from "../../types";
import { HammerClassDecorator } from "../ClassDecorator";

export const Service = HammerClassDecorator<IServiceOptions>(
	ELoadableTypes.SERVICE,
);
