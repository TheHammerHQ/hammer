import { configCache } from "../../utils";
import { HammerPropertyDecorator } from "../PropertyDecorator";

export const Config = HammerPropertyDecorator({
	get: (target) => configCache.get(target.constructor.name),
});
