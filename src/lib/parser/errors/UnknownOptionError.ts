export class UnknownOptionError extends Error {
  constructor(readonly option: string | undefined) {
    super(`option ${option} is not a valid option`);
  }
}
