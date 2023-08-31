import { OptionSpecString } from "../../types.js";

export class InvalidOptionSpecError extends Error {
  constructor(
    readonly configProp: string,
    readonly invalidOptionSpec: OptionSpecString | undefined,
  ) {
    let msg: string;
    if (invalidOptionSpec === undefined) {
      msg = `the option spec { ${configProp}: ${invalidOptionSpec} } is not valid: a valid option spec needs to be a string matching the pattern "-[letter]" or "-[letter](_string|_number)"`;
    } else {
      msg = `the option spec { ${configProp}: "${invalidOptionSpec}" } is not valid: "${invalidOptionSpec}" does not match the pattern "-[letter]" or "-[letter](_string|_number)"`;
    }
    super(msg);
  }
}
