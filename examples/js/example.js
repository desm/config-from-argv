#!/usr/bin/env node

/**
 * Steps:
 * - cd to this directory
 * - run "npm install"
 *
 * Example usage:
 * - ./example.js
 * - ./example.js -x
 * - ./example.js -f other.txt
 * - ./example.js -p 30
 * - ./example.js -x -f one.txt -p 2
 */

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
  const { newConfigFromArgv } = await import("config-from-argv");

  const argv = process.argv.slice(2);
  let configAndOperands;
  try {
    configAndOperands = newConfigFromArgv(baseConfig, configToCLIOpt, argv);
  } catch (error) {
    console.error(error.message);
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
