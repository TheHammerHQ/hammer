import { Controller, Get, APIRes, HTTPStatus } from "@hammerhq/plugin-http";

@Controller("/example")
export class ExampleController {
	@Get("/")
	getHelloWorld(): APIRes<null> {
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, world!",
			data: null,
		};
	}
}
