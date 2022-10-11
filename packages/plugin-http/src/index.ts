import { Plugin } from "@hammerhq/core";
import { Bootstrap } from "sidra";
import express from "express";

export * from "sidra";

export interface IHTTPPluginOptions {
	port: number;
	controllers: any[];
}

@Plugin({
	services: [],
})
export class HTTPPlugin {
	public static forRoot(options: IHTTPPluginOptions) {
		const app = express();
		Bootstrap(app, options.controllers, options.port);

		return this;
	}
}
