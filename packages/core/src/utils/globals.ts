import { Logger } from "@hammerhq/logger";
import type { ILoadable } from "../types/index.d.ts";

export const logger = new Logger("[CORE]:");

export const pluginCache = new Map<string, ILoadable>();
export const serviceCache = new Map<string, ILoadable>();
export const eventCache = new Map<string, ILoadable[]>();

export const configCache = new Map<string, any>();
