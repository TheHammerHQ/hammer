import { bootstrap } from "@hammerhq/core";
import { Client } from "discord.js";
import { CONFIG } from "./config";
import { ConfigurablePlugin } from "./plugins/configurable/configurable.plugin";
import { ExamplePlugin } from "./plugins/example/example.plugin";

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
		plugins: [
			ExamplePlugin,
			ConfigurablePlugin.forRoot({
				foo: "bar",
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
