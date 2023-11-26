import "reflect-metadata";

export * from "./Bootstrap";
export * from "./Controller";
export * from "./enums";
export * from "./global";
export * from "./Method";
export * from "./Middleware";
export * from "./ParamDecorator";
export * from "./Server";
export * from "./services/http.service";
export type * from "./types.d.ts";

import { defineConfig, Plugin } from "@hammerhq/core";
import { HTTPService } from "./services/http.service";
import type { IHTTPPluginOptions } from "./types.d.ts";

@Plugin({
	services: [HTTPService],
})
export class HTTPPlugin {
	constructor(private readonly httpService: HTTPService) {}

	public static forRoot(options: IHTTPPluginOptions) {
		defineConfig(HTTPService, options);
		return this;
	}

	onLoad() {
		this.httpService.bootstrap();
	}
}
