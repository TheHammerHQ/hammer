# bot

## 2.0.0

### Major Changes

-   Created the first major release for cli tool. Now it's possible to create a new bot with `create-hammer` command.

    -   Added `create-hammer` command with `create-hammer` package
        -   Consumers now can create plugins and bots using `npx create-hammer <name>` or `yarn create hammer <name>` command with ease!
    -   Added `hammer` command with `@hammer/cli` package
        -   Consumers now can install 3rd party plugins and bots using `hammer install <name>` command!
    -   Created `@hammerhq/hargs` package to parse command line arguments
    -   Created `@hammerhq/cli-tool` package to create cli tools with ease

### Patch Changes

-   Updated dependencies
    -   @hammerhq/plugin-sequelize@2.0.0
    -   @hammerhq/plugin-commands@2.0.0
    -   @hammerhq/plugin-http@2.0.0
    -   @hammerhq/logger@2.0.0
    -   @hammerhq/core@2.0.0

## 1.0.0

### Major Changes

-   Release first major version

### Patch Changes

-   Updated dependencies
    -   @hammerhq/plugin-sequelize@1.0.0
    -   @hammerhq/plugin-commands@1.0.0
    -   @hammerhq/plugin-http@1.0.0
    -   @hammerhq/logger@1.0.0
    -   @hammerhq/core@1.0.0
