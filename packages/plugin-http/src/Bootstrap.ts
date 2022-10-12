import { ILoadable, serviceCache } from "@hammerhq/core";
import { Server } from "http";
import express, { json, urlencoded } from "express";
import { APIRes, HTTPStatus, IParam, IRoute } from "./types";
import { controllerCache, logger } from "./global";
import { setServer } from "./utils/server";
import { createServer } from "http";

export const bootstrap = async (
	controllers: ILoadable[],
	port: number,
): Promise<Server> => {
	logger.event("Starting HTTP server...");

	const app = express();
	app.use(json());
	app.use(urlencoded({ extended: false }));

	const server = createServer(app);
	setServer(server);

	for (const controller of controllers) {
		logger.event("Loading controller", controller.name);

		const prefix: string | undefined = Reflect.getMetadata(
			"prefix",
			controller,
		);
		const routes: IRoute[] =
			Reflect.getMetadata("routes", controller) || [];

		const services: ILoadable[] = Reflect.getMetadata(
			"design:paramtypes",
			controller,
		);
		if (services) {
			for (const param of services) {
				const service = serviceCache.get(param.name);
				if (!service)
					throw new Error("Service not found: " + param.name);
			}
		}

		const params = (services || []).map((param) =>
			serviceCache.get(param.name),
		);

		const instance = new controller(...params);
		controllerCache.set(controller.name, instance);

		for (const route of routes) {
			logger.event("Loading route", route.path);
			const { method, path, middlewares, propertyKey }: IRoute = route;

			app[method](
				`${prefix}${path}`,
				...middlewares,
				async (req, res) => {
					try {
						const args: IParam<any, false>[] =
							Reflect.getMetadata(
								"arguments",
								controller.constructor,
								propertyKey,
							) || [];
						const resolved = args.map((arg) => {
							switch (arg.type) {
								case "request":
									return req;
								case "response":
									return res;
								case "param":
									return arg.data
										? req.params[arg.data]
										: req.params;
								case "query":
									return arg.data
										? req.query[arg.data]
										: req.query;
								case "body":
									return arg.data
										? req.body[arg.data]
										: req.body;
								case "headers":
									return arg.data
										? req.headers[arg.data]
										: req.headers;
								case "ip":
									return req.ip;
								case "service":
									return serviceCache.get(arg.data);
								default:
									return undefined;
							}
						});

						const result = instance[propertyKey as string](
							...resolved,
						);

						const status = res.statusCode || 200;
						res.status(status).send(result);
					} catch (e) {
						const resp: APIRes<string> = {
							statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
							message: "Internal Server Error",
							data: String(e),
						};
						res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(resp);
					}
				},
			);
			logger.success("Route loaded", route.path);
		}
		logger.success("Loaded controller", controller.name);
	}

	server.listen(port, () =>
		logger.success(`Server is running on port ${port}`),
	);

	return server;
};
