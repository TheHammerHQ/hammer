# @hammerhq/plugin-sequelize

This plugin adds the ability to use sequelize to Hammer projects.

# Installation

Install main plugin

```bash
$ npm install @hammerhq/plugin-sequelize sequelize sequelize-typescript
```

Install one of the following database drivers:

```bash
$ npm install pg pg-hstore # Postgres
$ npm install mysql2 #MySQL
$ npm install mariadb #MariaDB
$ npm install sqlite3 #SQLite
$ npm install tedious # Microsoft SQL Server
$ npm install oracledb # Oracle Database
```

# Usage

```ts
import { bootstrap } from "@hammerhq/core";
import { SequelizeModule } from "@hammerhq/plugin-sequelize";
import { Client } from "discord.js";
import { join } from "path";

const client = new Client(ClientOptions);

async function main() {
	await bootstrap({
		client,
		i18n: {
			defaultLocale: "en", // default locale, see @hammerhq/localization
			directory: join(__dirname, "..", "locales"), // locales directory, see @hammerhq/localization
		},
		plugins: [
			// hammer plugins here. You can download them from npm or create your own!
			SequelizeModule.forRoot({
				dialect: "sqlite", // your database driver like sqlite, postgres, mysql, etc.
				storage: ":memory:",
				models: [], // your models here, to create a model please refer to https://www.npmjs.com/package/sequelize-typescript#model-definition
			}),
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
```

# License

Copyright © 2022 [Barış DEMİRCİ](https://github.com/barbarbar338).

Distributed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) License. See `LICENSE` for more information.

# Contributing

Feel free to use GitHub's features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/my-feature`)
3. Run prettier (`npm run format`)
4. Commit your Changes (`git commit -m 'my awesome feature my-feature'`)
5. Push to the Branch (`git push origin feature/my-feature`)
6. Open a Pull Request

# Show your support

Give a ⭐️ if this project helped you!

# Contact

-   Mail: hammer@338.rocks
-   Discord: https://338.rocks/discord
-   Website: https://hammer.338.rocks
-   Documentation: https://hammer.338.rocks/plugins/official/sequelize
