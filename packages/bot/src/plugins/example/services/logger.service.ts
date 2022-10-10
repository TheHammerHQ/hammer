import { Service, Logger } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";

@Service({})
export class LoggerService {
	@Logger("[LoggerService]:")
	logger!: HammerLogger;

	onLoad() {
		this.logger.success("loaded!");
	}

	public log(...args: any[]) {
		this.logger.log(...args);
	}
}
