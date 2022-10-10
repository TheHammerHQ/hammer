import { eventCache, logger, serviceCache } from "../globals";
import { ETypes, IEventOptions, TService } from "../types";

export async function resolveEvent(Event: TService) {
	logger.event("Resolving service:", Event.name);

	const type = Reflect.getMetadata("type", Event);
	if (type != ETypes.EVENT) throw new Error("Invalid event, " + Event.name);

	const params = Reflect.getMetadata(
		"design:paramtypes",
		Event,
	) as TService[];

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
