#!/usr/bin/env node

const baseConfig = {
  printExtraLines: false,
  inputFile: "input.txt",
  leftPaddingAmount: 10,
};

const configToCLIOpt = {
  printExtraLines: "-x",
  inputFile: "-f_string",
  leftPaddingAmount: "-p_number",
};

const main = async () => {
  const process = await import("node:process");
  const console = await import("node:console");
  const { newConfigFromArgv, printDebugInfo } = await import("../lib/main.js");

  const argv = process.argv.slice(2);
  let configAndOperands;
  try {
    configAndOperands = newConfigFromArgv(baseConfig, configToCLIOpt, argv);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  const { newConfig, operands } = configAndOperands;
  printDebugInfo(newConfig, operands);
  process.exit(0);
};

main();
