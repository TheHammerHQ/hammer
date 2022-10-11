# @hammerhq/plugin-http

😎 HTTP Plugin for Hammer

```ts
import {
	HTTPPlugin,
	Controller,
	Get,
	APIRes,
	HTTPStatus,
} from "@hammerhq/plugin-http";

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

await bootstrap({
	// ...
	plugins: [
		// ...
		HTTPPlugin.forRoot({
			port: 3000, // http server port here
			controllers: [ExampleController], // controllers here
		}),
		// ...
	],
});
```
