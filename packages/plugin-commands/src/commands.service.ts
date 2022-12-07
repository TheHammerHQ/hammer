import {
	Client,
	Config,
	ILoadable,
	Logger,
	Service,
	serviceCache,
} from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { Client as DJSClient, Collection, REST, Routes } from "discord.js";
import { ECommandType, ICommandOptions, ICommandsPluginOptions } from "./types";

@Service({})
export class CommandsService {
	@Config()
	config!: ICommandsPluginOptions;

	@Client()
	client!: DJSClient;

	@Logger("[CommandsService]:")
	logger!: HammerLogger;

	public commands = new Collection<string, ILoadable>();

	private readonly rest = new REST().setToken(this.config.token);

	public async loadCommands() {
		this.logger.event("Loading commands...");

		const body = [];

		for (const command of this.config.commands) {
			const options = Reflect.getMetadata(
				"options",
				command,
			) as ICommandOptions;

			this.logger.info("Loading command", options.meta.name);

			const type = Reflect.getMetadata("type", command);

			if (type != ECommandType.SLASH_COMMAND) {
				throw new Error(
					`Invalid command type: ${type} for ${command.meta.name}`,
				);
			}

			const services: ILoadable[] = Reflect.getMetadata(
				"design:paramtypes",
				command,
			);
			if (services) {
				for (const param of services) {
					const service = serviceCache.get(param.name);
					if (!service)
						throw new Error("Service not found: " + param.name);
				}
			}

			body.push(options.meta.toJSON());

			const params = (services || []).map((param) =>
				serviceCache.get(param.name),
			);

			const instance = new command(...params);

			this.commands.set(options.meta.name, instance);

			this.logger.success("Loaded command", options.meta.name);
		}

		this.logger.event("Posting commands to Discord...");

		await this.rest.put(Routes.applicationCommands(this.config.clientId), {
			body,
		});

		this.logger.success("Commands loaded!");
	}
}
