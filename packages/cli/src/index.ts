#!/usr/bin/env node

import { tool } from "@hammerhq/cli-tool";
import { Logger } from "@hammerhq/logger";
import { execSync } from "child_process";
import { readFileSync, renameSync, rmSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createUserFolder, deleteFolder } from "./utils/folder";

const logger = new Logger("[Hammer CLI]:");

tool.createCommand(
	{
		name: "install",
		description: "Install a plugin to your Hammer bot",
		aliases: ["add", "i", "a"],
		category: "bot",
		usage: "--plugin <plugin>",
		example: [
			"--plugin github.com/barbarbar338/hammer-plugin-uptime",
			"-p github.com/TheHammerHQ/hammer-plugin-example",
		],
		argDefinitions: {
			"--plugin": String,

			"-p": "--plugin",
		},
	},
	(command, args) => {
		const pluginName = args["--plugin"] as string;
		if (!pluginName) {
			logger.error("Please specify a plugin to install.");

			process.exit(1);
		}

		logger.info("Installing plugin", pluginName);

		const [provider, username, plugin] = pluginName.split("/");
		if (!provider || !username || !plugin) {
			logger.error("Invalid plugin name:", pluginName);
			logger.warning(
				"Please use the format <provider>/<username>/<plugin>",
			);
			logger.info(
				"Example: github.com/barbarbar338/hammer-plugin-uptime",
			);

			process.exit(1);
		}

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

		logger.event("Move plugin to user folder...");
		try {
			deleteFolder(resolve(folders.userFolder, plugin));

			renameSync(
				resolve(folders.tempUserFolder, plugin, "dist"),
				resolve(folders.userFolder, plugin),
			);
		} catch (error) {
			logger.error("Failed to move plugin:", error);

			process.exit(1);
		}
		logger.success("Plugin moved.");

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
