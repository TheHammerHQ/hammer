# create-hammer

## 2.1.0

### Minor Changes

-   Fix plugin installation error

## 2.0.3

### Patch Changes

-   Fix template dependency version

## 2.0.2

### Patch Changes

-   Pipe logs to current terminal instance while running update command

## 2.0.1

### Patch Changes

-   Upgrading packages to latest version after creating a package with create-hammer cli

## 2.0.0

### Major Changes

-   Created the first major release for cli tool. Now it's possible to create a new bot with `create-hammer` command.

    -   Added `create-hammer` command with `create-hammer` package
        -   Consumers now can create plugins and bots using `npx create-hammer <name>` or `yarn create hammer <name>` command with ease!
    -   Added `hammer` command with `@hammer/cli` package
        -   Consumers now can install 3rd party plugins and bots using `hammer install <name>` command!
    -   Created `@hammerhq/hargs` package to parse command line arguments
    -   Created `@hammerhq/cli-tool` package to create cli tools with ease
