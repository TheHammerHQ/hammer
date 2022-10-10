import { Client, ClientEvents } from "discord.js";
import { ILoadable } from "./loadable.interface";

export interface IBootstrapOptions {
	client: Client;
	plugins: ILoadable[];
}

export interface IPluginOptions {
	services: ILoadable[];
	events?: ILoadable[];
}

export interface IServiceOptions {}

export interface IEventOptions {
	name: keyof ClientEvents;
	once: boolean;
}
