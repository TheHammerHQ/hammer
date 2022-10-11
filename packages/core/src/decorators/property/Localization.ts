import { getI18n } from "../../utils/localization";

export { I18n } from "@hammerhq/localization";

export const Localization = () => {
	const decorator: PropertyDecorator = (target, propertyKey) => {
		Object.defineProperty(target, propertyKey, {
			get: () => getI18n(),
		});
	};

	return decorator;
};
