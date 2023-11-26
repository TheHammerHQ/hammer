import { Request, Response } from "express";
import type { IParam } from "./types.d.ts";

export const ParamDecorator = <T, K extends boolean>(type: string) => {
	const factory = (data: T) => {
		const decorator: ParameterDecorator = (
			target,
			propertyKey,
			parameterIndex,
		) => {
			const args: IParam<T, K>[] =
				Reflect.getMetadata(
					"arguments",
					target.constructor,
					propertyKey as string,
				) || [];
			const existing = args.find((arg) => arg.index === parameterIndex);
			if (existing) args[parameterIndex + 1] = { ...existing, data };
			else
				args.unshift({
					index: parameterIndex,
					propertyKey: propertyKey as string,
					type,
					data,
				});

			Reflect.defineMetadata(
				"arguments",
				args,
				target.constructor,
				propertyKey as string,
			);
		};

		return decorator;
	};

	return factory;
};

export const Body = ParamDecorator<string, false>("body");
export const Query = ParamDecorator<string, false>("query");
export const Headers = ParamDecorator<string, false>("headers");
export const Ip = ParamDecorator<any, false>("headers");
export const Param = ParamDecorator<string, false>("param");
export const Req = ParamDecorator<Request, false>("request");
export const Res = ParamDecorator<Response, false>("response");
