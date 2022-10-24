# @hammerhq/core

-   Core package for Hammer Discord bot.
-   Allows you to create a bot with a simple API.
-   Built on top of [discord.js](https://discord.js.org/#/).
-   Built-in localization and logger support. More coming soon!
-   Incredible modularity with plugin support.

# Installation

```bash
$ npm install @hammerhq/core
```

# Creating bots with Hammer's core

```ts
import { bootstrap } from "@hammerhq/core";
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
		],
	});

	await client.login(CONFIG.BOT_TOKEN);
}

main();
```

# Creating plugins

## Simple plugin structure

```ts
import { Plugin } from "@hammerhq/core";

@Plugin({
	services: [], // services to register
	events: [], // events to register
})
export class MyPlugin {}
```

## Run functions on plugin load

```ts
import { Plugin } from "@hammerhq/core";

@Plugin({
	services: [], // services to register
	events: [], // events to register
})
export class MyPlugin {
	public async onLoad() {
		// do something on plugin load
		console.log("Plugin loaded!");
	}
}
```

## Inject services

```ts
import { Plugin } from "@hammerhq/core";
import { MyOtherService } from "/path/to/MyOtherService";

@Plugin({
	services: [], // services to register
	events: [], // events to register
})
export class MyPlugin {
	constructor(private readonly myOtherService: MyOtherService) {}

	// use your service like `this.myOtherService`
	public async onLoad() {
		this.myOtherService.doSomething();
	}
}
```

---

# Creating services

## Simple service structure

```ts
import { Service } from "@hammerhq/core";

@Service({})
export class MyService {
	// service code here
}
```

## Run functions on service load

```ts
import { Service } from "@hammerhq/core";

@Service({})
export class MyService {
	public async onLoad() {
		// do something on service load
		console.log("Service loaded!");
	}

	// service code here
}
```

## Injecting services

```ts
import { Service } from "@hammerhq/core";
import { MyOtherService } from "/path/to/MyOtherService";

@Service({})
export class MyService {
	constructor(private readonly myOtherService: MyOtherService) {}

	// use your service like `this.myOtherService`
	public async onLoad() {
		this.myOtherService.doSomething();
	}

	// service code here
}
```

---

# Creating events

## Simple event structure

```ts
import { Event } from "@hammerhq/core";

@Event({
	name: "ready", // event name, see discord.js client events
	once: false, // runs once or not
})
export class MyReadyEvent {
	public async execute() {
		// event code here
		console.log("Bot is ready!");
	}
}
```

## Run functions on event load

```ts
import { Event } from "@hammerhq/core";

@Event({
	name: "ready", // event name, see discord.js client events
	once: false, // runs once or not
})
export class MyReadyEvent {
	public async onLoad() {
		// do something on event load
		console.log("Event loaded!");
	}

	public async execute() {
		// event code here
		console.log("Bot is ready!");
	}
}
```

## Injecting services

```ts
import { Event } from "@hammerhq/core";
import { Message } from "discord.js";
import { MyOtherService } from "/path/to/MyOtherService";

@Event({
	name: "messageCreate", // event name, see discord.js client events
	once: false, // runs once or not
})
export class MyReadyEvent {
	constructor(private readonly myOtherService: MyOtherService) {}

	// use your service like `this.myOtherService`
	public async onLoad() {
		this.myOtherService.doSomething();
	}

	public async execute(message: Message) {
		// event code here
		message.channel.send("Hello world!");
	}
}
```

---

# Utilities

## Localization

Hammer's core comes with localization support. You can use it like this:

```ts
import { Service, Localization } from "@hammerhq/core";
import { I18n } from "@hammerhq/localization";

// we created a service for testing purposes but you can use localization service in events and plugins too
@Service({})
export class MyService {
	@Localization()
	i18n: I18n;

	// use your service like `this.i18n`
	public async onLoad() {
		// see @hammerhq/localization for more info
		const str = this.i18n.get("en", "services", "on_load", {
			service_name: "MyService",
		});

		console.log(str); // "MyService loaded!"
	}
}
```

## Logger

You can easily use `@hammerhq/logger` in you plugins, services and events. Just inject it like this:

```ts
import { Service, Logger } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";

// we created a service for testing purposes but you can use logger service in events and plugins too
@Service({})
export class MyService {
	@Logger("[MyService]:")
	logger: HammerLogger;

	// use your service like `this.logger`
	public async onLoad() {
		// see @hammerhq/logger for more info
		this.logger.success("MyService loaded!"); // [MyService]: MyService loaded!
	}
}
```

## Client

You can easily access client in you plugins, services and events. Just inject it like this:

```ts
import { Event, Client } from "@hammerhq/core";
import { Client as DJSClient } from "discord.js";

// we created an event for testing purposes but you can use client service in services and plugins too
@Event({
	name: "ready", // event name, see discord.js client events
	once: false, // runs once or not
})
export class MyReadyEvent {
	@Client()
	client: DJSClient;

	// use your service like `this.client`
	public execute() {
		console.log(`Logged in as ${client.user.tag}!`); // Logged in as Hammer#0000!
	}
}
```

---

# Complete plugin example

```ts
import { Plugin, Service, Event, Logger, Client } from "@hammerhq/core";
import { Logger as HammerLogger } from "@hammerhq/logger";
import { Client as DJSClient } from "discord.js";

@Service({})
export class MyService {
	@Logger("[MyService]:")
	logger: HammerLogger;

	public onLoad() {
		this.logger.event("MyService loaded!");
	}

	public add(a: number, b: number): number {
		return a + b;
	}
}

@Event({
	name: "ready",
	once: false,
})
export class MyReadyEvent {
	@Logger("[MyReadyEvent]:")
	logger: HammerLogger;

	@Client()
	client: DJSClient;

	constructor(private readonly myService: MyService) {}

	public onLoad() {
		this.logger.event("MyReadyEvent loaded!");
	}

	public execute() {
		const sum = this.myService.add(2, 2);

		this.client.user.setActivity(`2 + 2 = ${sum}`);
	}
}

@Plugin({
	services: [MyService],
	events: [MyReadyEvent],
})
export class MyPlugin {
	@Logger("[MyPlugin]:")
	logger: HammerLogger;

	public onLoad() {
		this.logger.event("MyPlugin loaded!");
	}
}
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
-   Documentation: https://hammer.338.rocks/packages/core
