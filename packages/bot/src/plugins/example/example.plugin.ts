import { Plugin } from "@hammerhq/core";
import { MessageCreateEvent } from "./events/messageCreate.event";
import { ReadyEvent } from "./events/ready.event";
import { LoggerService } from "./services/logger.service";
import { MathsService } from "./services/maths.service";

@Plugin({
	services: [MathsService, LoggerService],
	events: [ReadyEvent, MessageCreateEvent],
})
export class ExamplePlugin {}
