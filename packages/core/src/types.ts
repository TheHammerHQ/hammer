import { Client, ClientEvents } from "discord.js";

export enum ETypes {
	PLUGIN,
	SERVICE,
	EVENT,
}

export interface TType<T = any> extends Function {
	new (...args: any[]): T;
}

export type TService = TType<any> | ILoadable;

export interface ILoadable<T = any> extends Function {
	new (...args: any[]): T;
	onLoad?: () => void;
	[key: string]: unknown;
}

export interface IBootstrapOptions {
	client: Client;
	plugins: TService[];
}

export interface IPluginOptions {
	services: TService[];
	events?: TService[];
}

export interface IServiceOptions {}

export interface IEventOptions {
	name: keyof ClientEvents;
	once: boolean;
}
