import { Event } from "@hammerhq/core";
import { Interaction } from "discord.js";
import { CommandsService } from "./commands.service";

@Event({
	name: "interactionCreate",
	once: false,
})
export class InteractionCreateEvent {
	constructor(private readonly commandsService: CommandsService) {}

	public async execute(interaction: Interaction) {
		if (!interaction.isCommand()) return;
		const cmd = this.commandsService.commands.get(interaction.commandName);
		if (cmd) {
			await cmd.execute(interaction);
		}
	}
}
