import {
	hargs,
	IHargsOptionDefinition,
	IHargsParseResult,
} from "@hammerhq/hargs";
import "colors";

export interface ICommand {
	name: string;
	usage: string;
	example: string[];
	category: string;
	aliases: string[];
	description: string;
	argDefinitions: IHargsOptionDefinition;
}

export interface UnknownObject {
	[key: string]: unknown;
}

export interface HelpCategory {
	[key: string]: ICommand[];
}

export type ToolFunction = (
	command: string,
	args: IHargsParseResult,
) => unknown;

class Tool {
	private commands: ICommand[] = [];
	private commandExecuted = false;

	private handleHelp(command: ICommand): Tool {
		console.info(
			`\t${command.name.blue} - Help:\n\t` +
				`${"-".repeat(command.name.length + 9)}\n\t` +
				`${"Command Name".green}: ${command.name.yellow}\n\t` +
				`${"Usage".green}: ${command.name.yellow} ${command.usage.yellow}\n\t` +
				`${"Aliases".green}: ${command.aliases
					.map((alias) => alias.yellow)
					.join(", ")}\n\t` +
				`${"Category".green}: ${command.category.yellow}\n\t` +
				`${"Description".green}: ${command.description.yellow}\n\t` +
				`${"Example".green}:\n\t` +
				`\t${command.example
					.map((example) => `${command.name.blue} ${example.yellow}`)
					.join("\n\t\t")}`,
		);

		return this;
	}

	public createCommand(command: ICommand, fn: ToolFunction): Tool {
		command.example.unshift("--help");

		this.commands.push(command);

		if (
			command.name !== process.argv[2] &&
			!command.aliases.includes(process.argv[2])
		)
			return this;

		if (this.commandExecuted) return this;

		this.commandExecuted = true;

		const args = hargs(
			command.argDefinitions,
			process.argv.slice(3),
		) as IHargsParseResult;

		if (
			args["--help"] ||
			args._unknown.includes("--help") ||
			args._unknown.includes("-h")
		)
			return this.handleHelp(command);

		fn(command.name, args);

		return this;
	}

	public help(): void {
		if (this.commandExecuted) return;

		const help: HelpCategory = {};
		for (const command of this.commands) {
			const category = command.category;
			if (!help[category]) help[category] = [];

			help[category].push(command);
		}

		let str = "";
		for (const category in help) {
			const categoryName = (
				category.charAt(0).toUpperCase() + category.slice(1)
			).green;

			const commands = help[category]
				.map(
					(command) =>
						`\t${command.name.yellow} ${command.usage.yellow}`,
				)
				.join("\n\t");

			str += `\t${categoryName} Commands:\n\t${"-".repeat(
				categoryName.length + 1,
			)}\n\t${commands}\n\n`;
		}

		console.info(str);
	}
}

export const tool = new Tool();
