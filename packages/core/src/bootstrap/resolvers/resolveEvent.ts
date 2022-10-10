import { checkType } from "../../utils/checkType";
import { eventCache, logger, serviceCache } from "../../utils/globals";
import { ELoadableTypes, IEventOptions, ILoadable } from "../../types";

export async function resolveEvent(Event: ILoadable) {
	logger.event("Resolving event:", Event.name);

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

	Reflect.defineMetadata("options", options, instance);

	const events = eventCache.get(options.name) || [];
	events.push(instance);

	eventCache.set(options.name, events);

	logger.success("Event resolved:", Event.name);
}
