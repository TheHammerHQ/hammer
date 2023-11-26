import "reflect-metadata";

import { defineConfig, Plugin } from "@hammerhq/core";
import { CommandsService } from "./commands.service";
import { InteractionCreateEvent } from "./interactionCreate.event";
import type { ICommandsPluginOptions } from "./types.d.ts";

export * from "./Command";
export * from "./commands.service";
export * from "./enums";
export type * from "./types.d.ts";

@Plugin({
	services: [CommandsService],
	events: [InteractionCreateEvent],
})
export class CommandsPlugin {
	constructor(private readonly commandsService: CommandsService) {}

	public static forRoot(config: ICommandsPluginOptions) {
		defineConfig(CommandsService, config);

		return this;
	}

	public async onLoad() {
		await this.commandsService.loadCommands();
	}
}
