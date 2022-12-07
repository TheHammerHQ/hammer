import { Localization, Logger, Service } from "@hammerhq/core";
import { I18n } from "@hammerhq/localization";
import { Logger as HammerLogger } from "@hammerhq/logger";

@Service({})
export class LoggerService {
	@Logger("[LoggerService]:")
	logger!: HammerLogger;

	@Localization()
	i18n!: I18n;

	onLoad() {
		this.logger.success("loaded!", this.i18n);
	}

	public log(...args: any[]) {
		this.logger.log(...args);
	}
}
