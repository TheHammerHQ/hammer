import { Service, Logger } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { LoggerService } from "./logger.service";

@Service({})
export class MathsService {
	@Logger("[MathsService]:")
	logger!: HammerLogger;

	constructor(private readonly loggerService: LoggerService) {}

	onLoad() {
		this.logger.success("loaded!");
	}

	public add(a: number, b: number) {
		this.loggerService.log(`The sum of ${a} and ${b} is ${a + b}`);
	}
}
