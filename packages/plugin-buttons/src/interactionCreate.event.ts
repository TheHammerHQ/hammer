import { Event } from "@hammerhq/core";
import { Interaction } from "discord.js";
import { ButtonsService } from "./buttons.service";

@Event({
	name: "interactionCreate",
	once: false,
})
export class InteractionCreateEvent {
	constructor(private readonly buttonsService: ButtonsService) {}

	public async execute(interaction: Interaction) {
		if (!interaction.isButton()) return;

		const [buttonName, ...args] = interaction.customId.split("_");
		const button = this.buttonsService.buttons.get(buttonName);

		if (button) await button.execute(interaction, args);
	}
}
