import { Plugin } from "@hammerhq/core";
import { ReadyEvent } from "./events/ready.event";
import { LoggerService } from "./services/logger.service";
import { MathsService } from "./services/maths.service";

@Plugin({
	services: [MathsService, LoggerService],
	events: [ReadyEvent],
})
export class ExamplePlugin {}
