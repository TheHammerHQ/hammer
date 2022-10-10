import { Service } from "@hammerhq/core";

@Service({})
export class LoggerService {
	public log(...args: any[]) {
		console.log(...args);
	}
}
