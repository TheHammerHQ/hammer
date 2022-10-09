export enum ETypes {
	PLUGIN,
	SERVICE,
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
	plugins: TService[];
}

export interface IPluginOptions {
	services: TService[];
}

export interface IServiceOptions {}
