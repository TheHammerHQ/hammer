import { Service } from "@hammerhq/core";
import { LoggerService } from "./logger.service";

@Service({})
export class MathsService {
	constructor(private readonly loggerService: LoggerService) {}

	public add(a: number, b: number) {
		this.loggerService.log(`The sum of ${a} and ${b} is ${a + b}`);
	}
}
