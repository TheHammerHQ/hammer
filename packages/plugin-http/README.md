<p align="center">
    <img src="https://avatars.githubusercontent.com/u/109850261" alt="Logo" width="160" height="160" />
    <h3 align="center">Hammer Framework HTTP Plugin</h3>
    <p align="center">
        This plugin adds the ability to create http server to Hammer bots.
        <br />
        <a href="https://338.rocks/discord"><strong>Get support »</strong></a>
        <br />
        <br />
        <a href="https://github.com/TheHammerHQ/issues">Report Bug</a>
        ·
        <a href="https://hammer.338.rocks/docs/plugins/http">Documentation</a>
    </p>
</p>

# 📦 Installation

```bash
$ npm install @hammerhq/plugin-http
```

# 🚀 Usage

```ts
import { bootstrap } from "@hammerhq/core";
import { HTTPPlugin } from "@hammerhq/plugin-http";
import { Client } from "discord.js";
import { join } from "path";

// create your own controller or download them via npm!
import { MyController } from "./controllers/MyController";

const client = new Client(ClientOptions);

async function main() {
	await bootstrap({
		client,
		i18n: {
			defaultLocale: "en", // default locale, see @hammerhq/localization
			directory: join(__dirname, "..", "locales"), // locales directory, see @hammerhq/localization
		},
		plugins: [
			// hammer plugins here. You can download them with hammer cli, from npm and create your own!
			HTTPPlugin.forRoot({
				port: 3000, // http server port here
				controllers: [MyController], // controllers here
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
```

## 🌳 Creating a controller

```ts
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
```

# 🧦 Looking For Contributors

We are looking for contributors to actively work on Hammer and to contribute to the repos. There is still lots of work to do. If you are interested in contributing, please join our [Discord server](https://338.rocks/discord). (There will be a surprise for early contributors!)

# 🔑 License

Copyright © 2022 [Barış DEMİRCİ](https://github.com/barbarbar338).

Distributed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) License. See `LICENSE` for more information.

# 🧦 Contributing

This repo is open for #hacktoberfest. Feel free to use GitHub's features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/my-feature`)
3. Run prettier (`npm run format`)
4. Commit your Changes (`git commit -m 'my awesome feature my-feature'`)
5. Push to the Branch (`git push origin feature/my-feature`)
6. Open a Pull Request

# ⭐️ Show your support

Give a ⭐️ if this project helped you!

# ☎️ Contact

-   Mail: hammer@338.rocks
-   Discord: https://338.rocks/discord
-   Website: https://hammer.338.rocks
-   Documentation: https://hammer.338.rocks/docs/plugins/http
