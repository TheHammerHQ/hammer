import { Plugin } from "@hammerhq/core";
import { ReadyEvent } from "./events/ready.event";
import { LoggerService } from "./services/logger.service";

@Plugin({
	services: [LoggerService],
	events: [ReadyEvent],
})
export class ExamplePlugin {}
