import {
	Client,
	Config,
	ILoadable,
	Logger,
	Service,
	serviceCache,
} from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { Collection, Client as DJSClient } from "discord.js";
import { EButtonType } from "./enums";
import type { IButtonOptions, IButtonsPluginOptions } from "./types.d.ts";

@Service({})
export class ButtonsService {
	@Config()
	config!: IButtonsPluginOptions;

	@Client()
	client!: DJSClient;

	@Logger("[ButtonsService]:")
	logger!: HammerLogger;

	public buttons = new Collection<string, ILoadable>();

	public async loadButtons() {
		this.logger.event("Loading buttons...");

		for (const button of this.config.buttons) {
			const options = Reflect.getMetadata(
				"options",
				button,
			) as IButtonOptions;

			this.logger.info("Loading button", options.name);

			const type = Reflect.getMetadata("type", button);

			if (type != EButtonType.SIMPLE_BUTTON) {
				throw new Error(
					`Invalid button type: ${type} for ${button.name}`,
				);
			}

			const services: ILoadable[] = Reflect.getMetadata(
				"design:paramtypes",
				button,
			);
			if (services) {
				for (const param of services) {
					const service = serviceCache.get(param.name);
					if (!service)
						throw new Error("Service not found: " + param.name);
				}
			}

			const params = (services || []).map((param) =>
				serviceCache.get(param.name),
			);

			const instance = new button(...params);

			this.buttons.set(options.name, instance);

			this.logger.success("Loaded button", options.name);
		}

		this.logger.success("Buttons loaded!");
	}
}
