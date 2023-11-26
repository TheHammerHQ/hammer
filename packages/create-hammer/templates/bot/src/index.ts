import { bootstrap } from "@hammerhq/core";
import { CommandsPlugin } from "@hammerhq/plugin-commands";
import { Client } from "discord.js";
import { join } from "node:path";
import { PingCommand } from "./commands/ping";
import { CONFIG } from "./config";

const client = new Client({
	intents: [
		"GuildMembers",
		"GuildMessages",
		"GuildMembers",
		"Guilds",
		"MessageContent",
	],
});

async function main() {
	await bootstrap({
		client,
		i18n: {
			defaultLocale: "en",
			directory: join(__dirname, "..", "locales"),
		},
		plugins: [
			CommandsPlugin.forRoot({
				token: CONFIG.BOT_TOKEN,
				clientId: CONFIG.BOT_ID,
				commands: [PingCommand],
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
