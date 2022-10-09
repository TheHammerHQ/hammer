import { IBootstrapOptions } from "../types";
import { logger, pluginCache, serviceCache } from "../globals";
import { resolvePlugin } from "./resolvePlugin";

export const bootstrap = async ({ plugins }: IBootstrapOptions) => {
	logger.event("Starting Core...");

	try {
		for (const plugin of plugins) await resolvePlugin(plugin);

		logger.success("Core started!");

		console.log(pluginCache);
		console.log(serviceCache);
	} catch (err) {
		logger.error("Failed to start Core:", err);
		process.exit(1);
	}
};
