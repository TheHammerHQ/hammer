import { Event, Client, Logger } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { Client as DJSClient, Message } from "discord.js";
import { Server } from "@hammerhq/plugin-http";
import { Server as HTTPServer } from "http";
import { AddressInfo } from "net";

@Event({
	name: "messageCreate",
	once: false,
})
export class MessageCreateEvent {
	@Client()
	client!: DJSClient;

	@Logger("[MessageCreateEvent]:")
	logger!: HammerLogger;

	@Server()
	server!: HTTPServer;

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
			case "http-port":
				message.reply(
					`:hammer: ${(this.server.address() as AddressInfo).port}`,
				);
				break;
		}
	}
}
