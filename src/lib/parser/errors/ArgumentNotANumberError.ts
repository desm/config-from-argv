export class ArgumentNotANumberError extends Error {
  constructor(
    readonly option: string,
    readonly argument: string,
  ) {
    super(`option ${option} requires a numerical argument but was "${argument}"`);
  }
}
