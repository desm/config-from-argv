export const config = {
  printExtraLines: false,
  inputFile: "input.txt",
  leftPaddingAmount: 10,
};

import { ConfigToCLIOpt } from "./types.js";

export const configToCLIOpt: ConfigToCLIOpt<typeof config> = {
  printExtraLines: "-x",
  inputFile: "-f_string",
  leftPaddingAmount: "-p_number",
};
