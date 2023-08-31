import { OptionSpecString } from "../../types.js";

export class InvalidConfigPropError extends Error {
  constructor(
    readonly configProp: string,
    readonly invalidOptionSpec: OptionSpecString,
  ) {
    super(
      `the option spec { ${configProp}: "${invalidOptionSpec}" } is not valid: property "${configProp}" is not a property of the config object`,
    );
  }
}
