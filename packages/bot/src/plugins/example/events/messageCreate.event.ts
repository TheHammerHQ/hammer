import { Event, Client, Logger } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { Client as DJSClient, Message } from "discord.js";

@Event({
	name: "messageCreate",
	once: false,
})
export class MessageCreateEvent {
	@Client()
	client!: DJSClient;

	@Logger("[MessageCreateEvent]:")
	logger!: HammerLogger;

	onLoad() {
		this.logger.success("loaded!");
	}

	execute(message: Message) {
		if (message.author.bot) return;

		const prefix = "!";
		const [command, ...args] = message.content
			.trim()
			.slice(prefix.length)
			.split(" ");

		switch (command) {
			case "ping":
				message.reply(`:ping_pong: Pong! \`${this.client.ws.ping}ms\``);
				break;
			case "say":
				message.reply(args.join(" ") || "No args provided");
				break;
		}
	}
}
