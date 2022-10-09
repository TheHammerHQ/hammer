import { Logger } from "@hammerhq/logger";
import { TService } from "./types";

export const logger = new Logger("[CORE]:");

export const pluginCache = new Map<string, TService>();
export const serviceCache = new Map<string, TService>();
