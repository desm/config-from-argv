import { ArgumentMissingError } from "./errors/ArgumentMissingError.js";
import { ArgumentNotANumberError } from "./errors/ArgumentNotANumberError.js";
import { Option } from "./_types.js";

export const createPartialChangeObj = <T>(
  option: Option,
  configProperty: keyof T,
  cliArg: string | undefined,
): Partial<T> => {
  if (!option.takesArg) {
    return { [configProperty]: true } as Partial<T>;
  } else {
    if (cliArg === undefined) {
      throw new ArgumentMissingError(option.option);
    }
    if (option.argType === "string") {
      return { [configProperty]: cliArg } as Partial<T>;
    } else if (option.argType === "number") {
      return { [configProperty]: parseArgAsNumber(option.option, cliArg) } as Partial<T>;
    } else {
      // this should not happen, since the option spec was validated beforehand
      throw new Error(`unknown ArgType: ${option.argType}`);
    }
  }
};

const parseArgAsNumber = (option: string, arg: string): number => {
  const asInt = parseInt(arg);
  const asFloat = parseFloat(arg);

  if (`${asInt}` === arg.trim()) {
    return asInt;
  } else if (`${asFloat}` === arg.trim()) {
    return asFloat;
  } else {
    throw new ArgumentNotANumberError(option, arg);
  }
};
