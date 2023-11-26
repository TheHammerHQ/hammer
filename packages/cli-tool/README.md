# @hammerhq/cli-tool

✨ A simple CLI commander system

# 📥 Installation

```
$ npm install @hammerhq/cli-tool
```

# 🔧 Usage

```ts
tool
    .createCommand(ICommand, callback(commandName, args) => unknown) // create command
    .createCommand(ICommand, callback(commandName, args) => unknown) // create another command
    .help() // If none of the above commands are used, execute the help command.
```

-   `ICommand`: Where command is defined to be used when separating arguments. Structure:

```js
{
    name: "test", // Command name
    usage: "--message <your_message>", // Command usage
    example: [ "--message Hello, world!", "-m Test message" ], // Usage examples
    category: "test", // Command category
    aliases: [ "t" ], // Command aliases
    description: "just a test command", // Command description
    argDefinitions: {
        // Arg definitions
        "--message": String,

        // Alias definition
        "-m": "--message"
    } // Arg definitions (Learn about IHargsOptionDefinition below)
}
```

-   `IHargsOptionDefinition`: Where options are defined to be used when separating arguments. Structure:

```ts
type TArgName = `--${string}`;
type TAliasName = `-${string}`;

interface IHargsOptionDefinition {
	[key: TArgName | TAliasName]: typeof key extends TArgName
		? Function | [Function]
		: TArgName;
}
```

-   `callback(commandName, args) => unknown`: If the command you set is used, the action to be applied. Example:

```js
tool.createCommand(ICommand, (commandName, args) => {
	//         callback(commandName, args) ⬇️
	console.log("You used", commandName, "command with arguments", args);
});
```

# 🛠️ Example

```js
import { tool } from "@hammerhq/cli-tool";

tool
    .createCommand({
        name: "install",
        usage: "-m <module_name> [--version] <package_version>",
        example: [ "--module tool", "-m hargs --version 1.0.1" ],
        category: "utility",
        aliases: [ "i", "add" ],
        description: "Install packages from server",
        argDefinitions: {
            "--module": String,
            "--version": String,

            "-m": "--module",
            "-v": "--version"
        }
    }, (commandName, args) => {
        const module = args["--module"];
        const version = args["--version"];

        console.log("You have downloaded package", module, "with version" version ? version : "latest");
    })
    .help()
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

-   Mail: hammer@338.rocks
-   Discord: https://338.rocks/discord
-   Website: https://hammer.338.rocks
-   Documentation: https://hammer.338.rocks/packages/cli-tool
