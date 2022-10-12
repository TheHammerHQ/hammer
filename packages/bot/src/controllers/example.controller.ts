import {
	Controller,
	Get,
	APIRes,
	HTTPStatus,
	Server,
} from "@hammerhq/plugin-http";
import { Server as HTTPServer } from "http";
import { MathsService } from "../plugins/example/services/maths.service";

@Controller("/example")
export class ExampleController {
	@Server()
	server!: HTTPServer;

	constructor(private readonly mathsService: MathsService) {}

	@Get("/")
	getHelloWorld(): APIRes<any> {
		this.mathsService.add(1, 2);
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, world!",
			data: this.server.address(),
		};
	}
}
