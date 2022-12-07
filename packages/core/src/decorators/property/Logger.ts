import { Logger as HammerLogger } from "@hammerhq/logger";
import { HammerPropertyDecorator } from "../PropertyDecorator";

export const Logger = HammerPropertyDecorator<string>({
	value: (_, __, prefix) => new HammerLogger(prefix),
});
