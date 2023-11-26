import { Logger } from "@hammerhq/logger";
import { existsSync, mkdirSync, rmSync, statSync } from "fs";
import { resolve } from "path";

const logger = new Logger("[Hammer Folder Util]:");

export function createFolder(folder: string) {
	logger.event(`Checking if ${folder} exists...`);

	if (!existsSync(folder) || !statSync(folder).isDirectory()) {
		logger.event(`Creating ${folder}...`);

		try {
			mkdirSync(folder);
		} catch (error) {
			logger.error(`Failed to create ${folder}:`, error);

			process.exit(1);
		}
	}
}

export function deleteFolder(folder: string) {
	logger.event(`Checking if ${folder} exists...`);

	if (existsSync(folder) && statSync(folder).isDirectory()) {
		logger.event(`Deleting ${folder}...`);

		try {
			rmSync(folder, {
				recursive: true,
				force: true,
			});
		} catch (error) {
			logger.error(`Failed to delete ${folder}:`, error);

			process.exit(1);
		}
	}
}

export function createUserFolder(provider: string, username: string) {
	logger.event("Checking required folders...");

	const sourceFolder = resolve(process.cwd(), "src");
	const pluginsFolder = resolve(sourceFolder, "plugins");
	const providerFolder = resolve(pluginsFolder, provider);
	const tempFolder = resolve(providerFolder, "temp");
	const tempUserFolder = resolve(tempFolder, username);
	const userFolder = resolve(providerFolder, username);

	logger.info("Source folder:", sourceFolder);
	logger.info("Plugins folder:", pluginsFolder);
	logger.info("Provider folder:", providerFolder);
	logger.info("User folder:", userFolder);
	logger.info("User temp folder:", tempUserFolder);

	logger.event("Checking if source folder exists...");

	if (!existsSync(sourceFolder) || !statSync(sourceFolder).isDirectory()) {
		logger.error(
			"Source folder does not exist. Please create a Hammer bot with 'npx create-hammer <name>' command first.",
		);

		process.exit(1);
	}

	createFolder(pluginsFolder);
	createFolder(providerFolder);
	createFolder(tempFolder);
	createFolder(tempUserFolder);
	createFolder(userFolder);

	logger.success("All required folders exist.");

	return {
		sourceFolder,
		pluginsFolder,
		providerFolder,
		tempUserFolder,
		tempFolder,
		userFolder,
	};
}
