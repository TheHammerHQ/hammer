import { bootstrap } from "@hammerhq/core";
import { Client } from "discord.js";
import { ExamplePlugin } from "./plugins/example/example.plugin";

const client = new Client({
	intents: ["GuildMembers", "GuildMessages"],
});

bootstrap({
	client,
	plugins: [ExamplePlugin],
});
