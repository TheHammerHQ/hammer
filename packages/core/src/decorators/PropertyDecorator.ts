export interface IPropertyDecoratorOptions<T> {
	get?: (target: Object, propertyKey: string | symbol, options?: T) => any;
	set?: (target: Object, propertyKey: string | symbol, options?: T) => any;
	value?: (target: Object, propertyKey: string | symbol, options?: T) => any;
}

export const HammerPropertyDecorator = <T>({
	get,
	set,
	value,
}: IPropertyDecoratorOptions<T>) => {
	return (options?: T) => {
		const decorator: PropertyDecorator = (target, propertyKey) => {
			Object.defineProperty(target, propertyKey, {
				get: () => get?.(target, propertyKey, options),
				set: () => set?.(target, propertyKey, options),
				value: () => value?.(target, propertyKey, options),
			});
		};

		return decorator;
	};
};
