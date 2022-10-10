import { checkType } from "src/utils/checkType";
import { eventCache, logger, serviceCache } from "../../globals";
import { ELoadableTypes, IEventOptions, ILoadable } from "../../types";

export async function resolveEvent(Event: ILoadable) {
	logger.event("Resolving service:", Event.name);

	checkType(Event, ELoadableTypes.EVENT);

	const params = Reflect.getMetadata(
		"design:paramtypes",
		Event,
	) as ILoadable[];

	if (params) {
		for (const param of params) {
			const service = serviceCache.get(param.name);
			if (!service) throw new Error("Service not found: " + param.name);
		}
	}

	const instance = new Event(
		...(params || []).map((param) => serviceCache.get(param.name)),
	);

	if (instance.onLoad) await instance.onLoad();

	const options = Reflect.getMetadata("options", Event) as IEventOptions;

	const events = eventCache.get(options.name) || [];
	events.push(instance);

	eventCache.set(options.name, events);

	logger.success("Event resolved:", Event.name);
}
