import { configCache } from "../../utils";

export const Config = () => {
	const decorator: PropertyDecorator = (target, propertyKey) => {
		Object.defineProperty(target, propertyKey, {
			get: () => configCache.get(target.constructor.name),
		});
	};

	return decorator;
};
