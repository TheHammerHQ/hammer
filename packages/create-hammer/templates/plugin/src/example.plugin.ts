import { Logger, Plugin } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { ReadyEvent } from "./events/ready.event";
import { LoggerService } from "./services/logger.service";

@Plugin({
	services: [LoggerService],
	events: [ReadyEvent],
})
export class ExamplePlugin {
	@Logger("[ExamplePlugin]:")
	logger!: HammerLogger;

	public onLoad() {
		this.logger.success("loaded!");
	}
}
