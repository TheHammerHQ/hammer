import "reflect-metadata";

import { defineConfig, Plugin } from "@hammerhq/core";
import { HTTPService } from "./services/http.service";
import { IHTTPPluginOptions } from "./types";

export * from "./Bootstrap";
export * from "./Controller";
export * from "./global";
export * from "./Method";
export * from "./Middleware";
export * from "./ParamDecorator";
export * from "./Server";
export * from "./services/http.service";
export * from "./types";

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
