import { getServer } from "./utils/server";

export const Server = () => {
	const decorator: PropertyDecorator = (target, propertyKey) => {
		Object.defineProperty(target, propertyKey, {
			get: () => getServer(),
		});
	};

	return decorator;
};
