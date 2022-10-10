import { getClient } from "../../utils/client";
import { IEventOptions, ILoadable } from "../../types";
import { logger } from "../../utils/globals";

export const loadEvent = async (eventName: string, events: ILoadable[]) => {
	const client = getClient();

	logger.event("Loading event:", eventName);

	const mapped = events.reduce((obj, curr) => {
		const options = Reflect.getMetadata("options", curr) as IEventOptions;
		const type = options.once ? "once" : "on";

		if (!obj[type]) obj[type] = [];
		obj[type].push(curr);

		return obj;
	}, {} as Record<"on" | "once", ILoadable[]>);

	if (mapped.on)
		client.on(eventName, (...args) => {
			Promise.all(mapped.on.map((event) => event.execute(...args)));
		});
	if (mapped.once)
		client.once(eventName, (...args) => {
			Promise.all(mapped.once.map((event) => event.execute(...args)));
		});

	logger.success("Event loaded:", eventName);
};
