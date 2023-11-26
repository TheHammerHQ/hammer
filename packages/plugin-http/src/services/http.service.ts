import { Config, Service } from "@hammerhq/core";
import { bootstrap } from "../Bootstrap";
import type { IHTTPPluginOptions } from "../types.d.ts";

@Service({})
export class HTTPService {
	@Config()
	config!: IHTTPPluginOptions;

	public async bootstrap() {
		bootstrap(this.config.controllers, this.config.port);
	}
}
