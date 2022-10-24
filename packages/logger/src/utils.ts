import { ChalkFunction, grey, supportsColor } from "chalk";

const log = (
	prefix: string,
	logs: unknown[],
	icon: string,
	color: ChalkFunction,
): void => console.log(generateDate(), color(icon), prefix, ...logs);

export type TLogger = (...logs: unknown[]) => void;
export type TMockLogger = (...logs: unknown[]) => string;

export const icons = {
	infoIcon: supportsColor ? "ℹ" : "i",
	successIcon: supportsColor ? "✔" : "√",
	warningIcon: supportsColor ? "⚠" : "‼",
	errorIcon: supportsColor ? "✖" : "×",
	eventIcon: "☄",
	debugIcon: "☢",
	logIcon: "✎",
};

export function generateDate(): string {
	const options: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: false,
	};
	const date = new Date().toLocaleString("en-US", options);
	const result = grey(date);
	return result;
}

export function createLogger(
	prefix: string,
	icon: string,
	color: ChalkFunction,
): TLogger {
	return function logger(...logs: unknown[]): void {
		log(prefix, logs, icon, color);
	};
}

export const createMockLogger =
	(prefix: string, icon: string, color: ChalkFunction): TMockLogger =>
	(...logs: unknown[]): string =>
		`${generateDate()} ${color(icon)} ${prefix} ${logs.join(", ")}`;
