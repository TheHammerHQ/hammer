#!/usr/bin/env node

import { tool } from "@hammerhq/cli-tool";
import { Logger } from "@hammerhq/logger";
import { execSync } from "child_process";
import { cpSync, readFileSync, rmSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createUserFolder } from "./utils/createUserFolder";

const logger = new Logger("[Hammer CLI]:");

tool.createCommand(
	{
		name: "install",
		description: "Install a plugin to your Hammer bot",
		aliases: ["add", "i", "a"],
		category: "bot",
		usage: "<plugin>",
		example: ["@github.com/barbarbar338/hammer-plugin-uptime"],
		argDefinitions: [
			{
				name: "plugin",
				default: true,
				type: String,
				aliases: ["p", "plug", "module", "package"],
				isOptional: false,
			},
		],
	},
	(command, args) => {
		logger.info("Installing plugin", args.plugin);

		const [_, provider, username, plugin] = (args.plugin as string).split(
			"/",
		);

		const folders = createUserFolder(provider, username);

		logger.info("Installing plugin", plugin, "from user", username);

		logger.event("Cloning git repo...");
		try {
			execSync(`git clone https://${provider}/${username}/${plugin}`, {
				cwd: folders.tempUserFolder,
			});
		} catch (error) {
			logger.error("Failed to clone git repo:", error);

			process.exit(1);
		}
		logger.success("Git repo cloned.");

		logger.event("Installing dependencies...");
		try {
			execSync("npm install", {
				cwd: resolve(folders.tempUserFolder, plugin),
			});
		} catch (error) {
			logger.error("Failed to install dependencies:", error);

			process.exit(1);
		}
		logger.success("Dependencies installed.");

		logger.event("Building plugin...");
		try {
			execSync("npm run build", {
				cwd: resolve(folders.tempUserFolder, plugin),
			});
		} catch (error) {
			logger.error("Failed to build plugin:", error);

			process.exit(1);
		}
		logger.success("Plugin built.");

		logger.event("Copying plugin to user folder...");
		try {
			cpSync(
				resolve(folders.tempUserFolder, plugin, "dist"),
				resolve(folders.userFolder, plugin),
			);
		} catch (error) {
			logger.error("Failed to copy plugin:", error);

			process.exit(1);
		}
		logger.success("Plugin copied.");

		logger.event("Adding dependencies to package.json...");
		try {
			const pluginPackageJson = JSON.parse(
				readFileSync(
					resolve(folders.tempUserFolder, plugin, "package.json"),
					"utf-8",
				),
			);

			const packageJson = JSON.parse(
				readFileSync(
					resolve(folders.sourceFolder, "..", "package.json"),
					"utf-8",
				),
			);

			for (const packageName in pluginPackageJson.dependencies) {
				logger.info("Adding dependency", packageName);

				if (
					!packageJson.dependencies ||
					!packageJson.dependencies[packageName]
				)
					packageJson.dependencies[packageName] =
						pluginPackageJson.dependencies[packageName];
			}

			logger.event("Writing package.json...");

			try {
				writeFileSync(
					resolve(folders.sourceFolder, "..", "package.json"),
					JSON.stringify(packageJson, null, 2),
				);
			} catch (error) {
				logger.error("Failed to write package.json:", error);

				process.exit(1);
			}
		} catch (error) {
			logger.error("Failed to add dependencies to package.json:", error);

			process.exit(1);
		}
		logger.success("Dependencies added.");

		logger.event("Cleaning up...");
		try {
			rmSync(resolve(folders.tempUserFolder), {
				recursive: true,
				force: true,
			});
		} catch (error) {
			logger.error("Failed to clean up:", error);

			process.exit(1);
		}
		logger.success("Cleaned up.");

		logger.success("Plugin installed.");

		logger.warning(
			"Please include the plugin in your bot's bootstrap function manually and restart your bot.",
		);
	},
).help();
