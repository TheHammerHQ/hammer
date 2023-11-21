import { Logger } from "@hammerhq/logger";
import axios from "axios";
import { AttachmentBuilder, Client, TextBasedChannel } from "discord.js";
import { get, has, set, unset } from "./lodash";

export interface ITableOptions {
	channelId: string;
	botToken: string;
	backupId?: string;
	logging?: boolean;
}

export interface IObject {
	[key: string | number | symbol]: any;
}

export class Table {
	private cache: IObject = {};
	private client: Client;
	private channel?: TextBasedChannel;
	public logger: Logger;

	constructor(private readonly options: ITableOptions) {
		this.client = new Client({
			intents: ["GuildMessages", "Guilds", "MessageContent"],
		});
		this.logger = new Logger(options.channelId);
	}

	public get<T>(key: string): T | undefined {
		const data = get(this.cache, key);

		return data;
	}

	public set<T>(key: string, value: T) {
		set(this.cache, key, value);

		return this;
	}

	public delete(key: string) {
		unset(this.cache, key);

		return this;
	}

	public has(key: string) {
		return has(this.cache, key);
	}

	public map() {
		return this.cache;
	}

	public async connect() {
		const token = await this.client
			.login(this.options.botToken)
			.catch(() => undefined);
		if (!token) throw new Error("Invalid bot token");

		const channel = await this.getChannel();
		this.channel = channel;

		if (!this.options.backupId) {
			const latestMessage = await channel.messages.fetch({
				limit: 1,
			});
			this.options.backupId = latestMessage.first()?.id;
		}

		if (this.options.backupId) await this.loadBackup(this.options.backupId);

		return this;
	}

	private async getChannel() {
		const channel = await this.client.channels
			.fetch(this.options.channelId)
			.catch(() => undefined);
		if (!channel) throw new Error("Invalid channel id");
		if (!channel.isTextBased())
			throw new Error("Channel is not text based");

		return channel;
	}

	public async loadBackup(backupId: string) {
		const channel = this.channel || (await this.getChannel());

		const backupMessage = await channel.messages
			.fetch(backupId)
			.catch(() => undefined);
		if (!backupMessage) {
			if (this.options.logging)
				this.logger.warning(
					"Backup message not found, skipping loading backup and starting with empty cache",
				);

			this.cache = {};

			return this;
		}

		const attachment = backupMessage.attachments.first();
		if (
			!attachment ||
			!attachment.contentType?.includes("application/json")
		) {
			if (this.options.logging)
				this.logger.warning(
					"Backup message does not have a json attachment, skipping loading backup and starting with empty cache",
				);

			this.cache = {};

			return this;
		}

		const content = await axios.get(attachment.url, {
			responseType: "json",
		});

		this.cache = content.data;

		return this;
	}

	async save() {
		const channel = this.channel || (await this.getChannel());

		const attachment = new AttachmentBuilder(
			Buffer.from(JSON.stringify(this.cache)),
			{
				name: "table.json",
				description: "Table backup created with discord.db",
			},
		);

		await channel.send({ files: [attachment] });

		return this;
	}

	async disconnect() {
		await this.save();

		await this.client.destroy();
	}
}
