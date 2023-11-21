# @hammerhq/discord.db

✨ Use Discord as a database!

-   <b>discord.db</b> allows you to use Discord as database!
-   <b>discord.db</b> natively supports database backups! Everything is saved in a message!
-   <b>discord.db</b> is a very easy to use and easily editable JSON database module that allows you to create unlimited amount of unique database files!
-   <b>discord.db</b> also saves your data in a json file so you can access and edit simple files at any time.

# 🤓 Usage

```js
// discord.db files
const { Table } = require("discord.db");

// Creating a new table
const table = new Table({
	channelId: "DATABASE_CHANNEL_ID", // channel where the database will be stored
	botToken: "BOT_TOKEN", // bot token used to access database channel
});

// Connect to database
await table.connect();

// Set data
table.set("foo", "bar");

// Get data
table.get("foo"); // bar

// Get all data
table.map(); // { foo: "bar" }

// Delete data
table.delete("foo");

// Check if data exists
table.has("foo"); // false

// Save data to database
await table.save();

// Disconnect from database safely
await table.disconnect();
```

# 🛡️ Loading backup

Discord.DB natively supports database backups. You can load your backups with 2 different methods.

## Method 1: Initializing `Table` with `backupId`

```js
const table = new Table({
	channelId: "DATABASE_CHANNEL_ID",
	botToken: "BOT_TOKEN",
	backupId: "BACKUP_MESSAGE_ID", // see your database channel's message history and find the message id of the backup you want to load
});
```

## Method 2: Using `Table#loadBackup`

```js
const table = new Table({
	channelId: "DATABASE_CHANNEL_ID",
	botToken: "BOT_TOKEN",
});

await table.connect();

// Load backup
await table.loadBackup("BACKUP_MESSAGE_ID"); // see your database channel's message history and find the message id of the backup you want to load
```

# License

Copyright © 2023 [Barış DEMİRCİ](https://github.com/barbarbar338).

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

-   Website: https://338.rocks
-   Mail: hammer@338.rocks
-   Discord: https://338.rocks/discord
-   Documentation: https://hammer.338.rocks/packages/discord.db
