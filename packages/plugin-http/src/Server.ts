import { HammerPropertyDecorator } from "@hammerhq/core";
import { getServer } from "./utils/server";

export const Server = HammerPropertyDecorator({
	get: getServer,
});
