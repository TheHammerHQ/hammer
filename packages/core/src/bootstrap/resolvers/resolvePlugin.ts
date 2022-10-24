import { ELoadableTypes, ILoadable } from "../../types";
import { checkType } from "../../utils/checkType";
import { logger, pluginCache, serviceCache } from "../../utils/globals";
import { resolveEvent } from "./resolveEvent";
import { resolveService } from "./resolveService";

export const resolvePlugin = async (Plugin: ILoadable) => {
	if (pluginCache.has(Plugin.name)) return;

	logger.event("Resolving plugin:", Plugin.name);

	checkType(Plugin, ELoadableTypes.PLUGIN);

	const options = Reflect.getMetadata("options", Plugin);

	logger.event("Resolving services for plugin:", Plugin.name);
	for (const service of options.services as ILoadable[])
		await resolveService(service);
	logger.success("Services resolved for plugin:", Plugin.name);

	if (options.events) {
		logger.event("Resolving events for plugin:", Plugin.name);
		for (const event of options.events as ILoadable[])
			await resolveEvent(event);
		logger.success("Events resolved for plugin:", Plugin.name);
	}

	const params = Reflect.getMetadata(
		"design:paramtypes",
		Plugin,
	) as ILoadable[];

	if (params) {
		for (const param of params) {
			const service = serviceCache.get(param.name);
			if (!service) throw new Error("Service not found: " + param.name);
		}
	}

	const instance = new Plugin(
		...(params || []).map((param) => serviceCache.get(param.name)),
	);

	Reflect.defineMetadata("options", options, instance);

	if (instance.onLoad) await instance.onLoad();

	pluginCache.set(Plugin.name, instance);

	logger.success("Plugin resolved:", Plugin.name);
};
