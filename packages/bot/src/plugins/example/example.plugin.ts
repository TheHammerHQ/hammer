import { Logger, Plugin } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { MessageCreateEvent } from "./events/messageCreate.event";
import { ReadyEvent } from "./events/ready.event";
import { LoggerService } from "./services/logger.service";
import { MathsService } from "./services/maths.service";

@Plugin({
	services: [MathsService, LoggerService],
	events: [ReadyEvent, MessageCreateEvent],
})
export class ExamplePlugin {
	@Logger("[ExamplePlugin]:")
	logger!: HammerLogger;

	onLoad() {
		this.logger.success("loaded!");
		return new Promise((resolve) => setTimeout(resolve, 10_000));
	}
}
