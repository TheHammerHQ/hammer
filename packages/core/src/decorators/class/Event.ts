import { ELoadableTypes, IEventOptions } from "../../types";
import { ClassDecorator } from "../ClassDecorator";

export const Event = ClassDecorator<IEventOptions>(ELoadableTypes.EVENT);
