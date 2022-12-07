import { getI18n } from "../../utils/localization";
import { HammerPropertyDecorator } from "../PropertyDecorator";

export const Localization = HammerPropertyDecorator({
	get: getI18n,
});
