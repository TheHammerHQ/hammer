<p align="center">
    <img src="https://avatars.githubusercontent.com/u/109850261" alt="Logo" width="160" height="160" />
    <h3 align="center">Hammer Framework Commands Plugin</h3>
    <p align="center">
        This plugin adds the ability to register slash commands to Hammer bots.
        <br />
        <a href="https://338.rocks/discord"><strong>Get support »</strong></a>
        <br />
        <br />
        <a href="https://github.com/TheHammerHQ/issues">Report Bug</a>
        ·
        <a href="https://hammer.338.rocks/docs/plugins/commands">Documentation</a>
    </p>
</p>

# 📦 Installation

```bash
$ npm install @hammerhq/plugin-commands
```

# 🚀 Usage

```ts
import { bootstrap } from "@hammerhq/core";
import { CommandsPlugin } from "@hammerhq/plugin-commands";
import { Client } from "discord.js";
import { join } from "path";

// create your own commands or download them via npm!
import { MyCommand } from "./commands/MyCommand";

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
			CommandsPlugin.forRoot({
				token: CONFIG.BOT_TOKEN,
				clientId: CONFIG.CLIENT_ID,
				commands: [MyCommand], // commands to register
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
```

## 🧩 Creating a command

```ts
import { Client } from "@hammerhq/core";
import { Command } from "@hammerhq/plugin-commands";
import {
	ChatInputCommandInteraction,
	Client as DJSClient,
	SlashCommandBuilder,
} from "discord.js";

@Command({
	meta: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
})
export class PingCommand {
	@Client()
	client!: DJSClient;

	public async execute(interaction: ChatInputCommandInteraction) {
		interaction.reply({
			content: `:ping_pong: Pong! \`${this.client.ws.ping}ms\``,
		});
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
-   Documentation: https://hammer.338.rocks/docs/plugins/commands
