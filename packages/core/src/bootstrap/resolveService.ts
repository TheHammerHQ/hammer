import { logger, serviceCache } from "../globals";
import { ETypes, TService } from "../types";

export async function resolveService(Service: TService) {
	if (serviceCache.has(Service.name)) return;

	logger.event("Resolving service:", Service.name);

	const type = Reflect.getMetadata("type", Service);
	if (type != ETypes.SERVICE)
		throw new Error("Invalid service, " + Service.name);

	const params = Reflect.getMetadata(
		"design:paramtypes",
		Service,
	) as TService[];

	if (params) for (const param of params) await resolveService(param);

	const instance = new Service(
		...(params || []).map((param) => serviceCache.get(param.name)),
	);

	if (instance.onLoad) await instance.onLoad();

	serviceCache.set(Service.name, instance);

	logger.success("Service resolved:", Service.name);
}
