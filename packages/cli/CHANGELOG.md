# @hammerhq/cli

## 2.4.0

### Minor Changes

-   Using tsup for build

### Patch Changes

-   Updated dependencies
    -   @hammerhq/cli-tool@2.3.0
    -   @hammerhq/logger@2.2.0

## 2.3.0

### Minor Changes

-   Converted project from a public bot to framework

### Patch Changes

-   Updated dependencies
    -   @hammerhq/cli-tool@2.2.0
    -   @hammerhq/logger@2.1.0

## 2.2.2

### Patch Changes

-   Rename folder instead of copying it

## 2.2.1

### Patch Changes

-   Create plugin directory first

## 2.2.0

### Minor Changes

-   Changed argument parser

### Patch Changes

-   Updated dependencies
    -   @hammerhq/cli-tool@2.1.0

## 2.1.0

### Minor Changes

-   Fix plugin installation error

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
    -   @hammerhq/cli-tool@2.0.0
    -   @hammerhq/logger@2.0.0
