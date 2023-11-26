<p align="center">
    <img src="https://avatars.githubusercontent.com/u/109850261" alt="Logo" width="160" height="160" />
    <h3 align="center">Hammer Framework Buttons Plugin</h3>
    <p align="center">
        This plugin adds the ability to register buttons to Hammer bots.
        <br />
        <a href="https://338.rocks/discord"><strong>Get support »</strong></a>
        <br />
        <br />
        <a href="https://github.com/TheHammerHQ/issues">Report Bug</a>
        ·
        <a href="https://hammer.338.rocks/docs/plugins/buttons">Documentation</a>
    </p>
</p>

# 📦 Installation

```bash
$ npm install @hammerhq/plugin-buttons
```

# 🚀 Usage

```ts
import { bootstrap } from "@hammerhq/core";
import { ButtonsPlugin } from "@hammerhq/plugin-buttons";
import { Client } from "discord.js";
import { join } from "path";

// create your own button or download them via npm!
import { MyButton } from "./buttons/MyButton";

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
			ButtonsPlugin.forRoot({
				buttons: [MyButton], // buttons to register
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
```

## 🧩 Creating a button

```ts
import { Client } from "@hammerhq/core";
import { Button } from "@hammerhq/plugin-buttons";
import { ButtonInteraction, Client as DJSClient } from "discord.js";

@Button({
	name: "hit",
})
export class HitButton {
	@Client()
	client!: DJSClient;

	public async execute(interaction: ButtonInteraction) {
		interaction.reply({
			content: `:right_facing_fist: You hit the button!`,
		});
	}
}
```

## 🧩 Creating buttons with arguments

In order to create buttons with arguments, you should send buttons with proper custom id. Custom id should be in the format of `commandName_argument1_argument2_argument3`. For example, if you want to create a hug button that sends a message saying `you hugged @barbarbar338`, you should send the button with the custom id of `hug_123456789012345678`. `hug` is the button name and `123456789012345678` is the user id of `@barbarbar338`. Arguments and button name should be separated with `_` and arguments should be separated with `_` as well.

```ts
import { Client } from "@hammerhq/core";
import { Button } from "@hammerhq/plugin-buttons";
import { ButtonInteraction, Client as DJSClient } from "discord.js";

// This button will be registered as `hug` button
// but you should send it with the custom id of `hug_123456789012345678`
// where `123456789012345678` is the user id of the user you want to hug.
// everything else will be handled with the plugin.
@Button({
	name: "hug",
})
export class HugButton {
	@Client()
	client!: DJSClient;

	public async execute(interaction: ButtonInteraction, args: string[]) {
		const userId = args[0];
		const user = await this.client.users.fetch(userId);

		interaction.reply({
			content: `:hugging: You hugged ${user.username}!`,
		});
	}
}
```

# 🧦 Looking For Contributors

We are looking for contributors to actively work on Hammer and to contribute to the repos. There is still lots of work to do. If you are interested in contributing, please join our [Discord server](https://338.rocks/discord). (There will be a surprise for early contributors!)

# 🔑 License

Copyright © 2023 [Barış DEMİRCİ](https://github.com/barbarbar338).

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
-   Documentation: https://hammer.338.rocks/docs/plugins/buttons
