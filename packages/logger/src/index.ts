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

export class Logger {
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

		this.log = utils.createLogger(this.prefix, logIcon, grey);
		this.info = utils.createLogger(this.prefix, infoIcon, cyan);
		this.success = utils.createLogger(this.prefix, successIcon, green);
		this.warning = utils.createLogger(
			this.prefix,
			warningIcon,
			yellowBright,
		);
		this.error = utils.createLogger(this.prefix, errorIcon, red);
		this.event = utils.createLogger(this.prefix, eventIcon, magenta);
		this.debug = utils.createLogger(this.prefix, debugIcon, yellow);
	}
}

export { utils };
