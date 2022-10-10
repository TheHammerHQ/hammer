import { Event, Client, Logger } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { Client as DJSClient } from "discord.js";
import { MathsService } from "../services/maths.service";

@Event({
	name: "ready",
	once: true,
})
export class ReadyEvent {
	@Client()
	client!: DJSClient;

	@Logger("[ReadyEvent]:")
	logger!: HammerLogger;

	constructor(public readonly mathsService: MathsService) {}

	onLoad() {
		this.logger.success("loaded!");
		this.mathsService.add(5, 15);
	}

	execute() {
		console.log(`Logged in as ${this.client.user?.tag}!`);
	}
}
