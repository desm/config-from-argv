import { parseCommandLine } from "./parser/parseCommandLine.js";
import { ConfigToCLIOpt } from "./types.js";
import { validateConfig } from "./validation/validateConfig.js";

export { OptionSpecString } from "./types.js";

export { ConfigToCLIOpt };

export const newConfigFromArgv = <T extends object>(
  config: T,
  configOptions: ConfigToCLIOpt<T>,
  argv: string[]
): { newConfig: T; operands: string[] } => {
  validateConfig(config, configOptions);
  return parseCommandLine(config, configOptions, argv);
};

export const printDebugInfo = <T>(newConfig: T, operands: string[]) => {
  console.log(JSON.stringify(newConfig, null, 4));
  if (operands.length > 0) {
    console.log(`operands: "${operands.join('", "')}"`);
  }
};
