import { ILoadable } from "@hammerhq/core";
import { Logger } from "@hammerhq/logger";

export const controllerCache = new Map<string, ILoadable>();
export const logger = new Logger("[HTTPPlugin]:");
