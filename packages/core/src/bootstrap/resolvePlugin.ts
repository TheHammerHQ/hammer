import { logger, pluginCache } from "../globals";
import { ETypes, TService } from "../types";
import { resolveService } from "./resolveService";

export const resolvePlugin = async (Plugin: TService) => {
	logger.event("Resolving plugin:", Plugin.name);

	const type = Reflect.getMetadata("type", Plugin);

	if (type != ETypes.PLUGIN)
		throw new Error("Invalid plugin, " + Plugin.name);

	const instance = new Plugin();

	if (instance.onLoad) await instance.onLoad();

	pluginCache.set(Plugin.name, instance);

	const options = Reflect.getMetadata("plugin", Plugin);

	for (const Service of options.services as TService[])
		await resolveService(Service);

	logger.success("Plugin resolved:", Plugin.name);
};
