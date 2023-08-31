import { UnknownOptionError } from "./errors/UnknownOptionError.js";
import { Option } from "./_types.js";
import { createNewConfig } from "./createNewConfig.js";
import { createPartialChangeObj } from "./createPartialChangeObj.js";

export const newConfigFromOptions = <T extends object>(
  newConfig: T,
  optionOption: { [key: string]: Option },
  optionConfig: { [key: string]: keyof T },
  cliOptions: string[],
) => {
  const _cliOptions = [...cliOptions];
  while (_cliOptions.length > 0) {
    const cliOption = _cliOptions.shift();
    if (cliOption === undefined || !(cliOption in optionOption)) {
      throw new UnknownOptionError(cliOption);
    }
    let cliArg: string | undefined;
    const option = toOption(cliOption, optionOption);
    if (option.takesArg) {
      cliArg = _cliOptions.shift();
    }
    const configProperty = optionConfig[option.option] as keyof T;
    const change = createPartialChangeObj<T>(option, configProperty, cliArg);
    newConfig = createNewConfig(newConfig, change);
  }
  return newConfig;
};

const toOption = (cliOption: string | undefined, optionOption: { [key: string]: Option }) => {
  if (cliOption === undefined) {
    throw new Error("option is undefined"); // this can only happen if argv contains undefined values
  }
  const option = optionOption[cliOption];
  if (option === undefined) {
    throw new UnknownOptionError(cliOption);
  }
  return option;
};
