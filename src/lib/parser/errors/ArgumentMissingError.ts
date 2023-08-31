export class ArgumentMissingError extends Error {
  constructor(readonly option: string) {
    super(`option ${option} requires an argument but none was provided`);
  }
}
