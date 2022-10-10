import { logger, pluginCache } from "../globals";
import { ETypes, TService } from "../types";
import { resolveEvent } from "./resolveEvent";
import { resolveService } from "./resolveService";

export const resolvePlugin = async (Plugin: TService) => {
	if (pluginCache.has(Plugin.name)) return;

	logger.event("Resolving plugin:", Plugin.name);

	const type = Reflect.getMetadata("type", Plugin);
	if (type != ETypes.PLUGIN)
		throw new Error("Invalid plugin, " + Plugin.name);

	const instance = new Plugin();

	if (instance.onLoad) await instance.onLoad();

	pluginCache.set(Plugin.name, instance);

	const options = Reflect.getMetadata("options", Plugin);

	logger.event("Resolving services for plugin:", Plugin.name);
	for (const service of options.services as TService[])
		await resolveService(service);
	logger.success("Services resolved for plugin:", Plugin.name);

	logger.event("Resolving events for plugin:", Plugin.name);
	for (const event of options.events as TService[]) await resolveEvent(event);
	logger.success("Events resolved for plugin:", Plugin.name);

	logger.success("Plugin resolved:", Plugin.name);
};
