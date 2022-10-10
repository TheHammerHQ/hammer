import { getClient } from "../../utils/client";

export const Client = () => {
	const decorator: PropertyDecorator = (target, propertyKey) => {
		Object.defineProperty(target, propertyKey, {
			get: () => getClient(),
		});
	};

	return decorator;
};
