export interface I18nOptions {
	directory?: string;
	defaultLocale: string;
}

export interface I18nToJSON {
	constants?: I18nConstants;
	[key: string]: unknown;
}

export type I18nConstants = { [param: string]: string };
export type I18nArgs = { [param: string]: string };
export type I18nString = { [param: string]: string };
export type I18nFile = Map<string, I18nString>;
