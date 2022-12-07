import { ELoadableTypes, IEventOptions } from "../../types";
import { HammerClassDecorator } from "../ClassDecorator";

export const Event = HammerClassDecorator<IEventOptions>(ELoadableTypes.EVENT);
