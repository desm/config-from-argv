![workflow](https://github.com/desm/config-from-argv/actions/workflows/main.yml/badge.svg)

# config-from-argv

Command-line argument parser for CLI scripts written in Javascript or TypeScript.

## Usage

Define a base config:

```TypeScript
const baseConfig = {
  printExtraLines: false,
  inputFile: "input.txt",
  leftPaddingAmount: 10,
};
```

Tell `config-from-argv` how to map command-line arguments to your `baseConfig`:

```TypeScript
import { ConfigToCLIOpt } from "config-from-argv";

const configToCLIOpt: ConfigToCLIOpt<typeof baseConfig> = {
  printExtraLines: "-x",
  inputFile: "-f_string",
  leftPaddingAmount: "-p_number",
};
```

In the example above:

- `-x` will set `printExtraLines` to the boolean `true`
- `-f other.txt` will set `inputFile` to the string `"other.txt"`
- `-p 30` will set `leftPaddingAmount` to the number `30`

#### Last Step

Call `newConfigFromArgv` to get the final configuration:

```TypeScript
import { newConfigFromArgv } from "config-from-argv";

const config = newConfigFromArgv(baseConfig, configToCLIOpt, process.argv.slice(2));
```

## Examples

Note: install project's node modules before trying out the examples:

```Shell
$ npm install # in project root
```

- Javascript:
  - [examples/js/example.js](examples/js/example.js)
- TypeScript:
  - [examples/ts/example.ts](examples/ts/example.ts)
  - https://github.com/desm/config-from-argv-ts-example
