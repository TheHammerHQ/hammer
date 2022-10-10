import { Plugin, defineConfig } from "@hammerhq/core";
import { ConfigurableService, IConfig } from "./configurable.service";

@Plugin({
	services: [ConfigurableService],
})
export class ConfigurablePlugin {
	public static forRoot(config: IConfig) {
		defineConfig(ConfigurableService, config);

		return this;
	}
}
