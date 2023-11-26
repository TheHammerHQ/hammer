import type { IRoute, TMiddlewareFunction } from "./types.d.ts";

export const Middlewate = (middleware: TMiddlewareFunction) => {
	const decorator: PropertyDecorator = (target, propertKey) => {
		let routes: IRoute[] =
			Reflect.getMetadata("routes", target.constructor) || [];

		const route = routes.find((route) => route.propertyKey === propertKey);
		if (!route) throw new Error("Route not found");

		route.middlewares.push(middleware);
		routes = routes.filter((route) => route.propertyKey !== propertKey);

		Reflect.defineMetadata(
			"routes",
			[...routes, route],
			target.constructor,
		);
	};

	return decorator;
};
