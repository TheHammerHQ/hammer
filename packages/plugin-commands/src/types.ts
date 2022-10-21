import { ILoadable } from "@hammerhq/core";
import { SlashCommandBuilder } from "discord.js";

export interface ICommandOptions {
	meta: SlashCommandBuilder;
}

export enum ECommandType {
	SLASH_COMMAND = "slash_command",
}

export interface ICommandsPluginOptions {
	commands: ILoadable[];
	token: string;
	clientId: string;
}
