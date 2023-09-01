#!/usr/bin/env node

import process from "node:process";
import console from "node:console";
import { newConfigFromArgv, ConfigToCLIOpt } from "../lib/main.js";

const baseConfig = {
  printExtraLines: false,
  inputFile: "input.txt",
  leftPaddingAmount: 10,
};

const configToCLIOpt: ConfigToCLIOpt<typeof baseConfig> = {
  printExtraLines: "-x",
  inputFile: "-f_string",
  leftPaddingAmount: "-p_number",
};

const main = () => {
  const argv = process.argv.slice(2);
  let configAndOperands: ReturnType<typeof newConfigFromArgv>;
  try {
    configAndOperands = newConfigFromArgv(baseConfig, configToCLIOpt, argv);
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
  const { newConfig, operands } = configAndOperands;
  console.log(JSON.stringify(newConfig, null, 4));
  if (operands.length > 0) {
    console.log(`operands: "${operands.join('", "')}"`);
  }
  process.exit(0);
};

main();
