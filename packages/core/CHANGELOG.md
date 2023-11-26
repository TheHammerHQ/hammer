# @hammerhq/core

## 2.1.0

### Minor Changes

-   Converted project from a public bot to framework

### Patch Changes

-   Updated dependencies
    -   @hammerhq/localization@2.1.0
    -   @hammerhq/logger@2.1.0

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
    -   @hammerhq/localization@2.0.0
    -   @hammerhq/logger@2.0.0

## 1.0.0

### Major Changes

-   Release first major version

### Patch Changes

-   Updated dependencies
    -   @hammerhq/localization@1.0.0
    -   @hammerhq/logger@1.0.0
