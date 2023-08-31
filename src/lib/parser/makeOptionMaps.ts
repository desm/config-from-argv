import { ConfigToCLIOpt, OptionSpecString } from "../types.js";
import { ArgType, Option } from "./_types.js";

export const makeOptionMaps = <T>(configToCLIOpt: ConfigToCLIOpt<T>) => {
  const a: { [key: string]: Option } = {};
  const b: { [key: string]: keyof T } = {};
  for (const configProperty of Object.keys(configToCLIOpt)) {
    const optionSpecString = configToCLIOpt[configProperty as keyof T];
    const option = toOption(optionSpecString as string);
    a[option.option] = option;
    b[option.option] = configProperty as keyof T;
  }
  return { optionOption: a, optionConfig: b };
};

function toOption(optionSpecString: OptionSpecString): Option {
  const option = optionSpecString.substring(0, 2);
  const takesArg = optionSpecString.length > 2;
  const argType: ArgType = takesArg ? argTypeOf(optionSpecString) : null;
  return { option, takesArg, argType };
}

function argTypeOf(optionSpecString: OptionSpecString): ArgType {
  if (optionSpecString.indexOf("string") !== -1) {
    return "string";
  } else if (optionSpecString.indexOf("number") !== -1) {
    return "number";
  } else {
    // this should not happen, since the option spec was validated beforehand
    throw new Error(`could not figure out argType for option spec "${optionSpecString}"`);
  }
}
