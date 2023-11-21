import {
	APIRes,
	Controller,
	Get,
	HTTPStatus,
	Server,
} from "@hammerhq/plugin-http";
import { Server as HTTPServer } from "http";

@Controller("/example")
export class ExampleController {
	@Server()
	server!: HTTPServer;

	@Get("/")
	getHelloWorld(): APIRes<any> {
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, world!",
			data: this.server.address(),
		};
	}
}
