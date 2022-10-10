import { Event } from "@hammerhq/core";
import { Client } from "discord.js";
import { MathsService } from "../services/maths.service";

@Event({
	name: "ready",
	once: true,
})
export class ReadyEvent {
	constructor(public readonly mathsService: MathsService) {}

	onLoad() {
		this.mathsService.add(5, 15);
	}

	execute(client: Client) {
		console.log(`Logged in as ${client.user?.tag}!`);
	}
}
