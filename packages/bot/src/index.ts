import { bootstrap } from "@hammerhq/core";
import { CommandsPlugin } from "@hammerhq/plugin-commands";
import { HTTPPlugin } from "@hammerhq/plugin-http";
import { Client } from "discord.js";
import { join } from "path";
import { PingCommand } from "./commands/ping";
import { CONFIG } from "./config";
import { ExampleController } from "./controllers/example.controller";

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
			HTTPPlugin.forRoot({
				port: 3000,
				controllers: [ExampleController],
			}),
			CommandsPlugin.forRoot({
				token: CONFIG.BOT_TOKEN,
				clientId: CONFIG.CLIENT_ID,
				commands: [PingCommand],
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
