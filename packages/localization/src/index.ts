import fs from "fs";
import path from "path";
import yaml from "yaml";
import {
	I18nArgs,
	I18nConstants,
	I18nFile,
	I18nOptions,
	I18nString,
	I18nToJSON,
} from "./types";

export class I18n {
	private locales = new Map<string, I18nFile>();
	private directory: string;
	private defaultLocale: string;
	private constants?: I18nConstants;

	constructor(options: I18nOptions) {
		this.defaultLocale = options.defaultLocale;
		this.directory = path.resolve(
			options.directory ? options.directory : "./locales",
		);

		const localeArray = fs
			.readdirSync(this.directory)
			.filter((file) =>
				fs.statSync(path.join(this.directory, file)).isDirectory(),
			);

		localeArray.forEach((locale) => {
			const localeMap = new Map<string, I18nString>();
			const fileArray = fs
				.readdirSync(path.join(this.directory, locale))
				.filter(
					(file) =>
						!fs
							.statSync(path.join(this.directory, locale, file))
							.isDirectory(),
				)
				.filter((file) => file.endsWith(".yaml"));

			fileArray.forEach((section) => {
				const filePath = path.join(this.directory, locale, section);
				const file = fs.readFileSync(filePath, "utf8");
				const fileObject = yaml.parse(file);
				localeMap.set(section.replace(".yaml", ""), fileObject);
			});

			this.locales.set(locale, localeMap);
		});

		if (fs.existsSync(path.join(this.directory, "constants.yaml"))) {
			const filePath = path.join(this.directory, "constants.yaml");
			const file = fs.readFileSync(filePath, "utf8");
			const fileObject = yaml.parse(file);
			this.constants = fileObject;
		}
	}

	private resolveString(
		locale: string,
		section: string,
		key: string,
	): string {
		const localeMap =
			this.locales.get(locale) || this.locales.get(this.defaultLocale);
		if (!localeMap) return `Locale '${locale}' not found.`;

		const sectionMap = localeMap.get(section);
		if (!sectionMap)
			return `Section '${section}' not found in locale '${locale}'`;

		const stringFromKey = sectionMap[key];
		if (!stringFromKey)
			return `Key '${key}' not found in section ${section} in locale '${locale}'`;

		return stringFromKey;
	}

	private replace(content: string, args?: I18nArgs): string {
		if (args) {
			for (const arg in args) {
				const regToken = new RegExp(`%{${arg}}`, "gm");
				content = content.replace(regToken, args[arg]);
			}
		}

		const allConstants = this.constants;
		if (allConstants) {
			for (const constant in allConstants) {
				const regToken = new RegExp(`%{${constant}}`, "gm");

				content = content.replace(regToken, allConstants[constant]);
			}
		}

		return content;
	}

	public getLocales = (): string[] => Array.from(this.locales.keys());
	public getConstant = (constant: string): string | undefined =>
		this.constants
			? this.constants[constant]
				? this.constants[constant]
				: undefined
			: undefined;

	public toJSON(args?: I18nArgs): I18nToJSON {
		const payload: I18nToJSON = { constants: this.constants };
		const localeIterator = this.getLocales();

		localeIterator.forEach((locale) => {
			const localeObj: I18nToJSON = {};
			const file = this.locales.get(locale) as I18nFile;

			const sectionIterator = Array.from(file.keys());
			sectionIterator.forEach((section) => {
				const stringObject = file.get(section) as I18nString;
				for (const str in stringObject) {
					stringObject[str] = this.replace(stringObject[str], args);
				}

				localeObj[section] = stringObject;
			});

			payload[locale] = localeObj;
		});

		return payload;
	}

	public get(
		locale: string,
		section: string,
		key: string,
		args?: I18nArgs,
	): string {
		const resolvedString = this.resolveString(locale, section, key);
		const replacedString = this.replace(resolvedString, args);

		return replacedString;
	}
}
