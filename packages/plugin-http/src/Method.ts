import { IRoute, TMethods } from "./types";

export const Method = (method: TMethods) => {
	const factory = (path?: string) => {
		const decorator: MethodDecorator = (target, propertyKey) => {
			const routes: IRoute[] =
				Reflect.getMetadata("routes", target.constructor) || [];

			routes.push({
				method,
				path,
				middlewares: [],
				propertyKey,
			});

			Reflect.defineMetadata("routes", routes, target.constructor);
		};

		return decorator;
	};

	return factory;
};

export const Get = Method("get");
export const Post = Method("post");
export const Put = Method("put");
export const Delete = Method("delete");
export const Patch = Method("patch");
export const Options = Method("options");
export const Head = Method("head");
export const All = Method("all");
