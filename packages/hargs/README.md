# @hammerhq/hargs

✨ A simple argument parsing system with 0 dependencies

# 📥 Installation

```
$ npm install # @hammerhq/hargs
```

# 🔧 Usage

```js
hargs(IOptionDefinition[], argv?);
```

-   `IOptionDefinition[]`: Where options are defined to be used when separating arguments. Structure:

```js
{
    name: "OptionName",
    type: String, //OptionType (function)
    aliases?: [ "option", "aliases", "t" ],
    default?: false
}
```

-   `argv?`: Arguments to parse. Default is `process.argv.slice(2)` (`string[]`).

# 🛠️ Example

```js
/* es6 */
import { hargs } from "hargs";

/* commonJS */
const { hargs } = require("hargs");

const definitions = [
	{ name: "help", type: Boolean, aliases: ["h", "halp", "yardim", "y"] },
	{ name: "message", type: String, default: true },
	{ name: "page", type: Number },
];

const argv = ["This", "is", "message", "-h", "--page", "2", "--foo", "bar"];

hargs(definitions, argv);
/*
 * {
 *     _unknown: {
 *         foo: "bar"
 *     },
 *     help: true,
 *     message: "This is message",
 *     page: 2
 * }
 */
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
-   Documentation: https://hammer.338.rocks/packages/hargs
