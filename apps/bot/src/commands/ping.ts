import { Client } from "@hammerhq/core";
import { Command } from "@hammerhq/plugin-commands";
import {
	ChatInputCommandInteraction,
	Client as DJSClient,
	SlashCommandBuilder,
} from "discord.js";

@Command({
	meta: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
})
export class PingCommand {
	@Client()
	client!: DJSClient;

	public async execute(interaction: ChatInputCommandInteraction) {
		interaction.reply({
			content: `:ping_pong: Pong! \`${this.client.ws.ping}ms\``,
		});
	}
}
