import { ConfigToCLIOpt } from "../types.js";
import { createNewConfig } from "./createNewConfig.js";
import { Option } from "./_types.js";
import { makeOptionMaps } from "./makeOptionMaps.js";
import { splitOptionsAndOperands } from "./splitOptionsAndOperands.js";
import { newConfigFromOptions } from "./newConfigFromOptions.js";

export const parseCommandLine = <Config extends object>(
  config: Config,
  configOptions: ConfigToCLIOpt<Config>,
  argv: string[],
): { newConfig: Config; operands: string[] } => {
  const { optionOption, optionConfig } = makeOptionMaps<Config>(configOptions);
  const optionsWithArgs = listOptionsWithArgs(optionOption);
  const { cliOptions, cliOperands } = splitOptionsAndOperands(argv, optionsWithArgs);
  let newConfig = createNewConfig(config, {});
  newConfig = newConfigFromOptions(newConfig, optionOption, optionConfig, cliOptions);
  return { newConfig, operands: cliOperands };
};

function listOptionsWithArgs(m: { [key: string]: Option }): string[] {
  return Object.values(m)
    .filter((option) => option.takesArg)
    .map((option) => option.option);
}
