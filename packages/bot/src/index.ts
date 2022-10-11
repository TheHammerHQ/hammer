import { bootstrap } from "@hammerhq/core";
import { Client } from "discord.js";
import { CONFIG } from "./config";
import { ConfigurablePlugin } from "./plugins/configurable/configurable.plugin";
import { ExamplePlugin } from "./plugins/example/example.plugin";
import { HTTPPlugin } from "@hammerhq/plugin-http";
import { ExampleController } from "./controllers/example.controller";
import { join } from "path";

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
			ExamplePlugin,
			ConfigurablePlugin.forRoot({
				foo: "bar",
			}),
			HTTPPlugin.forRoot({
				port: 3000,
				controllers: [ExampleController],
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
