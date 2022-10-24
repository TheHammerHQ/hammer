# @hammerhq/localization

✨ YAML based localization system for everyone!

-   This is a YAML based localisation system that will make your job quite easy
-   Just create your language folder and seperate everything in files
-   Set your constants in `constants.yaml` and apply to everything

# 💡 Example

```js
import { I18n } from "@hammerhq/localization";

/*
    options:
        directory?: string;
        defaultLocale: string;
*/
const parser = new I18n({
	defaultLocale: "en",
});

parser.getLocales(); // => [ "en", "tr" ];
parser.getConstant(); // => all constants;
parser.getConstant("owner"); // => "owner" constant;
parser.toJSON(); // => all language data in an object
parser.toJSON({ arg: "this is an argument" }); // => all language data in an object with argument replaced

parser.get("en", "info", "test"); // "test" string in "info" section in "en" folder
parser.get("tr", "messages", "message", { arg: "this is an argument" }); // "message" string in "messages" section in "tr" folder with "arg" argument
```

# 📝 File Structure

### `locales/constants.yaml` example

```yaml
owner: barbarbar338
site: "https://hammer.338.rocks"
anotherConstant: this is a constant
```

### `locales/{locale}/{section}.yaml` example

```yaml
withConstant: this string uses %{owner} constant
withArgs: this string uses %{argument} argument and %{anotherArgument} argument
withConstantsAndArguments: this string uses %{simpleArgument} argument and %{site} constant
```

# 📁 Folder Structure

```
📂 locales/
├─── 📝 constants.yaml
├─── 📂 en
│    ├─── 📝 info.yaml
│    ├─── 📝 messages.yaml
│    └─── 📝 test.yaml
└─── 📂 tr
     ├─── 📝 info.yaml
     ├─── 📝 messages.yaml
     └─── 📝 test.yaml

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
-   Documentation: https://hammer.338.rocks/packages/localization
