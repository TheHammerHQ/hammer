import { ILoadable } from "@hammerhq/core";

export interface IButtonOptions {
	name: string;
}

export interface IButtonsPluginOptions {
	buttons: ILoadable[];
}
