import { cyan, green, grey, magenta, red, yellow, yellowBright } from "chalk";
import * as utils from "./utils";

const {
	infoIcon,
	errorIcon,
	successIcon,
	warningIcon,
	eventIcon,
	debugIcon,
	logIcon,
} = utils.icons;

export class MockLogger {
	private prefix: string;

	public log: utils.TLogger;
	public info: utils.TLogger;
	public success: utils.TLogger;
	public warning: utils.TLogger;
	public error: utils.TLogger;
	public event: utils.TLogger;
	public debug: utils.TLogger;

	constructor(prefix?: string) {
		this.prefix = prefix || "[HAMMER]:";

		this.log = utils.createMockLogger(this.prefix, logIcon, grey);
		this.info = utils.createMockLogger(this.prefix, infoIcon, cyan);
		this.success = utils.createMockLogger(this.prefix, successIcon, green);
		this.warning = utils.createMockLogger(
			this.prefix,
			warningIcon,
			yellowBright,
		);
		this.error = utils.createMockLogger(this.prefix, errorIcon, red);
		this.event = utils.createMockLogger(this.prefix, eventIcon, magenta);
		this.debug = utils.createMockLogger(this.prefix, debugIcon, yellow);
	}
}

export { utils };
