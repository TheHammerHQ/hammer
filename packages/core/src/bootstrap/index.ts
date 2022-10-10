import { setClient } from "../utils/client";
import { IBootstrapOptions } from "../types";
import {
	eventCache,
	logger,
	pluginCache,
	serviceCache,
} from "../utils/globals";
import { resolvePlugin } from "./resolvers/resolvePlugin";
import { loadEvent } from "./loaders/loadEvent";

export const bootstrap = async ({ plugins, client }: IBootstrapOptions) => {
	logger.event("Bootstrapping Core...");

	setClient(client);

	try {
		logger.event("Resolving plugins...");
		for (const plugin of plugins) await resolvePlugin(plugin);
		logger.success("Plugins resolved!");
	} catch (err) {
		logger.error("Failed to start Core:", err);
		process.exit(1);
	}

	logger.event("Loading events...");
	for (const eventName of eventCache.keys())
		loadEvent(eventName, eventCache.get(eventName) || []);
	logger.success("Events loaded!");

	logger.success("Core bootstrapped!");

	const res = {
		pluginCache,
		serviceCache,
		eventCache,
	};

	return res;
};
