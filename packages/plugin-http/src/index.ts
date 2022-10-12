import "reflect-metadata";

import { Plugin } from "@hammerhq/core";
import { IHTTPPluginOptions } from "./types";
import { bootstrap } from "./Bootstrap";

export * from "./Controller";
export * from "./Method";
export * from "./Middleware";
export * from "./ParamDecorator";
export * from "./global";
export * from "./Bootstrap";
export * from "./types";
export * from "./Server";

let config: IHTTPPluginOptions;

@Plugin({
	services: [],
})
export class HTTPPlugin {
	public static forRoot(options: IHTTPPluginOptions) {
		config = options;
		return this;
	}

	onLoad() {
		bootstrap(config.controllers, config.port);
	}
}
