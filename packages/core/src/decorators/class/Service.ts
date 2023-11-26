import { ELoadableTypes } from "src";
import type { IServiceOptions } from "../../types/index.d.ts";
import { HammerClassDecorator } from "../ClassDecorator";

export const Service = HammerClassDecorator<IServiceOptions>(
	ELoadableTypes.SERVICE,
);
