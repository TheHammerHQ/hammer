import "reflect-metadata";

import { defineConfig, Plugin } from "@hammerhq/core";
import { ButtonsService } from "./buttons.service";
import { InteractionCreateEvent } from "./interactionCreate.event";
import type { IButtonsPluginOptions } from "./types.d.ts";

export * from "./Button";
export * from "./buttons.service";
export * from "./enums";
export type * from "./types.d.ts";

@Plugin({
	services: [ButtonsService],
	events: [InteractionCreateEvent],
})
export class ButtonsPlugin {
	constructor(private readonly buttonsService: ButtonsService) {}

	public static forRoot(config: IButtonsPluginOptions) {
		defineConfig(ButtonsService, config);

		return this;
	}

	public async onLoad() {
		await this.buttonsService.loadButtons();
	}
}
