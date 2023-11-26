<p align="center">
    <img src="https://avatars.githubusercontent.com/u/109850261" alt="Logo" width="160" height="160" />
    <h3 align="center">Hammer Framework Hargs Package</h3>
    <p align="center">
        ✨ A simple argument parsing system with 0 dependencies
        <br />
        <a href="https://338.rocks/discord"><strong>Get support »</strong></a>
        <br />
        <br />
        <a href="https://github.com/TheHammerHQ/issues">Report Bug</a>
        ·
        <a href="https://hammer.338.rocks/docs/packages/hargs">Documentation</a>
    </p>
</p>

# @hammerhq/hargs

✨ A simple argument parsing system with 0 dependencies

-   A friendly fork of [vercel/arg](https://github.com/vercel/arg)

# 📦 Installation

```bash
$ npm install @hammerhq/hargs
```

# 🚀 Usage

```js
hargs(IOptionDefinition, argv?);
```

-   `IOptionDefinition`: Where options are defined to be used when separating arguments. Structure:

```js
{
    // Option definitions
    "--option": String,
    "--option2": Boolean,
    "--option3": MyCustomFunction,

    // Aliases
    "-o": "--option",
}
```

-   `argv?`: Arguments to parse. Default is `process.argv.slice(2)` (`string[]`).

# 🛠️ Example

```js
/* es6 */
import { hargs } from "@hammerhq/hargs";

/* commonJS */
const { hargs } = require("@hammerhq/hargs");

const argv = ["--foo=bar", "-p", "2", "--foo", "baz", "test", "1", "2", "-h"];

hargs(
	{
		"--help": Boolean,
		"--page": Number,
		"--foo": [String],

		"-p": "--page",
		"-h": "--help",
	},
	argv,
);
/*
{
  _unknown: [ 'test', '1', '2' ],
  '--foo': [ 'bar', 'baz' ],
  '--page': 2,
  '--help': false
}
 */
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
-   Documentation: https://hammer.338.rocks/docs/packages/hargs
