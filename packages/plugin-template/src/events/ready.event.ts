import { Client, Event, Logger } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { Client as DJSClient } from "discord.js";
import { LoggerService } from "../services/logger.service";

@Event({
	name: "ready",
	once: true,
})
export class ReadyEvent {
	@Client()
	client!: DJSClient;

	@Logger("[ReadyEvent]:")
	logger!: HammerLogger;

	constructor(public readonly loggerService: LoggerService) {}

	onLoad() {
		this.logger.success("loaded!");
		this.loggerService.log("loaded!");
	}

	execute() {
		console.log(`Logged in as ${this.client.user?.tag}!`);
	}
}
