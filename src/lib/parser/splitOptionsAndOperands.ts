export const splitOptionsAndOperands = (argv: string[], optionsWithArgs: string[] = []) => {
  const takesArg = (option: string) => optionsWithArgs.indexOf(option) !== -1;

  let index: number;
  const cliOptions: string[] = [];
  const cliOperands: string[] = [];

  for (index = 0; index < argv.length; index++) {
    const element = argv[index] as string;
    if (isOption(element)) {
      cliOptions.push(element);
      if (takesArg(element)) {
        index++;
        if (index < argv.length) {
          cliOptions.push(argv[index] as string);
        }
      }
    } else if (element === "--") {
      index++;
      break;
    } else {
      break;
    }
  }
  if (index < argv.length) {
    cliOperands.push(...argv.slice(index));
  }
  return { cliOptions, cliOperands };
};

const isOption = (s: string) => s.match(/^-[a-zA-Z0-9]$/) !== null;
