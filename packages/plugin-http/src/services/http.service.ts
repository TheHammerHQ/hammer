import { Config, Service } from "@hammerhq/core/dist";
import { IHTTPPluginOptions } from "src/types";
import { bootstrap } from "../Bootstrap";

@Service({})
export class HTTPService {
	@Config()
	config!: IHTTPPluginOptions;

	public async bootstrap() {
		bootstrap(this.config.controllers, this.config.port);
	}
}
