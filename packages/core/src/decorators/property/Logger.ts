import { Logger as HammerLogger } from "@hammerhq/logger";

export const Logger = (prefix: string) => {
	const decorator: PropertyDecorator = (target, propertyKey) => {
		Object.defineProperty(target, propertyKey, {
			value: new HammerLogger(prefix),
		});
	};

	return decorator;
};
