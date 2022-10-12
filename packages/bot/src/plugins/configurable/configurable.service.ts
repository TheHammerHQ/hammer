import { Service, Config } from "@hammerhq/core";

export interface IConfig {
	foo: string;
}

@Service({})
export class ConfigurableService {
	@Config()
	config!: IConfig;

	onLoad() {
		console.log("ConfigurableService loaded", this.config.foo);
	}
}
