import { NextFunction, Request, Response } from "express";
import { HTTPStatus } from "./enums";

export interface IHTTPPluginOptions {
	port: number;
	controllers: any[];
}

export type TMiddlewareFunction = (
	request: Request,
	response: Response,
	next: NextFunction,
) => any;

export type TMethods =
	| "get"
	| "post"
	| "put"
	| "delete"
	| "patch"
	| "options"
	| "head"
	| "all";

export interface IRoute {
	method: TMethods;
	path?: string;
	middlewares: TMiddlewareFunction[];
	propertyKey: string | symbol;
}

export interface IParam<T, K extends boolean> {
	index: number;
	propertyKey: string | symbol;
	type: string;
	data: K extends true ? T : T | undefined;
}

export interface APIRes<T> {
	statusCode: HTTPStatus;
	message: string;
	error?: string;
	data: T;
	[prop: string]: unknown;
}
