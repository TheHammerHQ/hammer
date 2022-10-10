export interface ILoadable<T = any> extends Function {
	new (...args: any[]): T;
}
