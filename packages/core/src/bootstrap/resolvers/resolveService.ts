import { ELoadableTypes, ILoadable } from "../../types";
import { checkType } from "../../utils/checkType";
import { logger, serviceCache } from "../../utils/globals";

export async function resolveService(Service: ILoadable) {
	if (serviceCache.has(Service.name)) return;

	logger.event("Resolving service:", Service.name);

	checkType(Service, ELoadableTypes.SERVICE);

	const params = Reflect.getMetadata(
		"design:paramtypes",
		Service,
	) as ILoadable[];

	if (params) for (const param of params) await resolveService(param);

	const instance = new Service(
		...(params || []).map((param) => serviceCache.get(param.name)),
	);

	if (instance.onLoad) await instance.onLoad();

	const options = Reflect.getMetadata("options", Service);

	Reflect.defineMetadata("options", options, instance);

	serviceCache.set(Service.name, instance);

	logger.success("Service resolved:", Service.name);
}
