import { OptionSpecString } from "../../types.js";

export class InvalidOptionSpecError extends Error {
  constructor(
    readonly configProp: string,
    readonly invalidOptionSpec: OptionSpecString | undefined,
  ) {
    let msg: string;
    if (invalidOptionSpec === undefined) {
      msg = `{ ${configProp}: ${invalidOptionSpec} } is not valid: value must be a string that matches the pattern /^-[a-zA-Z0-9](_string|_number)?$/`;
    } else {
      msg = `{ ${configProp}: "${invalidOptionSpec}" } is not valid: "${invalidOptionSpec}" does not match the pattern /^-[a-zA-Z0-9](_string|_number)?$/`;
    }
    super(msg);
  }
}
