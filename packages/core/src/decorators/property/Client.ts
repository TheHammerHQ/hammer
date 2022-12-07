import { getClient } from "../../utils/client";
import { HammerPropertyDecorator } from "../PropertyDecorator";

export const Client = HammerPropertyDecorator({
	get: getClient,
});
