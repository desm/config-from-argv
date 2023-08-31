import { ConfigToCLIOpt, OptionSpecString } from "../types.js";
import { InvalidOptionSpecError } from "./errors/InvalidOptionSpecError.js";
import { InvalidConfigPropError } from "./errors/InvalidConfigPropError.js";

export const validateConfig = <T extends object>(config: T, configOptions: ConfigToCLIOpt<T>) => {
  for (const configProp of Object.keys(configOptions)) {
    const optionSpecString = configOptions[configProp as keyof T];
    if (optionSpecString === undefined) {
      throw new InvalidOptionSpecError(configProp, optionSpecString);
    }
    if (!(configProp in config)) {
      throw new InvalidConfigPropError(configProp, optionSpecString);
    }
    if (!isValidOptionSpecString(optionSpecString as string)) {
      throw new InvalidOptionSpecError(configProp, optionSpecString);
    }
  }
};

const isValidOptionSpecString = (optionSpec: OptionSpecString) => {
  return optionSpec.match(/^-[a-zA-Z0-9](_string|_number)?$/) !== null;
};
