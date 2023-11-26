export type TArgName = `-${string}`;

export interface IHargsOptionDefinition {
	[key: TArgName]: Function | [Function] | TArgName;
}

export interface IHargsAliasDefinition {
	[key: TArgName]: TArgName;
}

export interface IHargsParseResult {
	[key: TArgName]: unknown;
	_unknown: unknown[];
}

export type TCustomHandler = (
	value: any,
	name: TArgName,
	previousValue: any[],
) => any;

export function hargs(
	definitions: IHargsOptionDefinition,
	argv = process.argv.slice(2),
) {
	const result: IHargsParseResult = { _unknown: [] };

	const aliases: IHargsAliasDefinition = {};
	const handlers: IHargsOptionDefinition = {};

	for (const key in definitions) {
		if (!key.startsWith("-")) continue;
		if (key === "--") continue;
		if (key === "-") continue;

		let definition = definitions[key as TArgName];
		if (!definition) continue;

		if (typeof definition === "string") {
			aliases[key as TArgName] = definition;
			continue;
		}

		if (
			Array.isArray(definition) &&
			(definition as [Function]).length === 1 &&
			typeof definition[0] === "function"
		) {
			const [fn] = definition as [Function];
			definition = ((value: any, name: TArgName, prev: any[] = []) => {
				prev.push(fn(value, name, prev[prev.length - 1]));

				return prev;
			}) as unknown as TArgName;
		}

		handlers[key as TArgName] = definition;
	}

	for (let i = 0, len = argv.length; i < len; i++) {
		const arg = argv[i];

		if (arg === "--") {
			result._unknown = result._unknown.concat(argv.slice(i + 1));
			break;
		}

		if (arg.length > 1 && arg[0] === "-") {
			const separatedArguments =
				arg[1] === "-" || arg.length === 2
					? [arg]
					: arg
							.slice(1)
							.split("")
							.map((a) => `-${a}`);

			for (let j = 0; j < separatedArguments.length; j++) {
				const arg = separatedArguments[j];
				const [originalArgName, argStr] =
					arg[1] === "-" ? arg.split(/=(.*)/, 2) : [arg, undefined];

				let argName = originalArgName;
				while (argName in aliases) {
					argName = aliases[argName as TArgName];
				}

				if (!(argName in handlers)) {
					result._unknown.push(arg);
					continue;
				}

				const type = handlers[
					argName as TArgName
				] as unknown as Function;

				if (argStr === undefined) {
					result[argName as TArgName] = type(
						argv[i + 1],
						argName,
						result[argName as TArgName],
					);

					++i;
				} else {
					result[argName as TArgName] = type(
						argStr,
						argName,
						result[argName as TArgName],
					);
				}
			}
		} else result._unknown.push(arg);
	}

	return result;
}
