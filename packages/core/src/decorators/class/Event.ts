import { ELoadableTypes } from "src";
import type { IEventOptions } from "../../types/index.d.ts";
import { HammerClassDecorator } from "../ClassDecorator";

export const Event = HammerClassDecorator<IEventOptions>(ELoadableTypes.EVENT);
