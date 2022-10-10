import { IBootstrapOptions } from "../types";
import { eventCache, logger, pluginCache, serviceCache } from "../globals";
import { resolvePlugin } from "./resolvers/resolvePlugin";

export const bootstrap = async ({ plugins }: IBootstrapOptions) => {
	logger.event("Starting Core...");

	try {
		logger.event("Resolving plugins...");
		for (const plugin of plugins) await resolvePlugin(plugin);
		logger.success("Plugins resolved!");
	} catch (err) {
		logger.error("Failed to start Core:", err);
		process.exit(1);
	}

	logger.success("Core started!");

	const res = {
		pluginCache,
		serviceCache,
		eventCache,
	};

	return res;
};
