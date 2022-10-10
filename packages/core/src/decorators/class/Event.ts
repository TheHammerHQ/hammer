import { ETypes, IEventOptions } from "../../types";
import { ClassDecorator } from "../ClassDecorator";

export const Event = ClassDecorator<IEventOptions>(ETypes.EVENT);
