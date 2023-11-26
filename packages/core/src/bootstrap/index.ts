import { I18n } from "@hammerhq/localization";
import type { IBootstrapOptions } from "../types/index.d.ts";
import { setClient } from "../utils/client";
import {
	eventCache,
	logger,
	pluginCache,
	serviceCache,
} from "../utils/globals";
import { setI18n } from "../utils/localization";
import { loadEvent } from "./loaders/loadEvent";
import { resolvePlugin } from "./resolvers/resolvePlugin";

export const bootstrap = async ({
	plugins,
	client,
	i18n,
}: IBootstrapOptions) => {
	logger.event("Bootstrapping Core...");

	setI18n(new I18n(i18n));
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
