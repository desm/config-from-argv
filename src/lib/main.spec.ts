import { newConfigFromArgv } from "./main.js";
import { ArgumentMissingError } from "./parser/errors/ArgumentMissingError.js";
import { ArgumentNotANumberError } from "./parser/errors/ArgumentNotANumberError.js";
import { UnknownOptionError } from "./parser/errors/UnknownOptionError.js";
import { InvalidConfigPropError } from "./validation/errors/InvalidConfigPropError.js";
import { InvalidOptionSpecError } from "./validation/errors/InvalidOptionSpecError.js";

describe("newConfigFromArgv", () => {
  it("returns a copy of the config", () => {
    const baseConfig = {};
    const { newConfig } = newConfigFromArgv(baseConfig, {}, []);
    expect(newConfig).not.toBe(baseConfig);
  });

  it("returns the boolean 'true' for -X (flags requiring 0 arguments)", () => {
    const baseConfig = { print: false };
    const argvConfig = { print: "-p" };
    const argv = ["-p"];
    const { newConfig } = newConfigFromArgv(baseConfig, argvConfig, argv);
    expect(newConfig).toEqual({ print: true });
  });

  it("returns string values for -X_string (flags requiring 1 argument)", () => {
    const baseConfig = { file: "" };
    const argvConfig = { file: "-f_string" };
    const argv = ["-f", "input.txt"];
    const { newConfig } = newConfigFromArgv(baseConfig, argvConfig, argv);
    expect(newConfig).toEqual({ file: "input.txt" });
  });

  it("returns numerical values for -X_number (flags requiring 1 argument)", () => {
    const baseConfig = { padding: 0, degree: 0 };
    const argvConfig = { padding: "-p_number", degree: "-d_number" };
    const argv = ["-p", "30", "-d", "10.5"];
    const { newConfig } = newConfigFromArgv(baseConfig, argvConfig, argv);
    expect(newConfig).toEqual({ padding: 30, degree: 10.5 });
  });

  it("returns rest of command line as operands", () => {
    const baseConfig = { print: false };
    const argvConfig = { print: "-p" };
    const argv = ["-p", "a", "b", "c"];
    const { operands } = newConfigFromArgv(baseConfig, argvConfig, argv);
    expect(operands).toEqual(["a", "b", "c"]);
  });

  describe("'--' syntax", () => {
    it("treats anything after '--' as operands", () => {
      const baseConfig = { print: false };
      const argvConfig = { print: "-p" };
      const argv = ["--", "-p"];
      const { operands } = newConfigFromArgv(baseConfig, argvConfig, argv);
      expect(operands).toEqual(["-p"]);
    });
  });

  describe("when argvConfig contains coding errors", () => {
    it("throws an error if a property of argvConfig does not exist in the config", () => {
      const baseConfig = { print: false };
      const argvConfig = { incorrect: "-p" };
      try {
        newConfigFromArgv(baseConfig, argvConfig as object, []);
        throw new Error(); // in case newConfigFromArgv doesn't throw like it should
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidConfigPropError);
        expect((error as Error).message).toEqual(
          '{ incorrect: "-p" } is not valid: property "incorrect" is not a property of the config object'
        );
      }
    });

    it("throws an error if one of values in argvConfig is not valid", () => {
      const baseConfig = { print: false };
      const argvConfig = { print: "incorrect" };
      try {
        newConfigFromArgv(baseConfig, argvConfig, []);
        throw new Error(); // in case newConfigFromArgv doesn't throw like it should
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidOptionSpecError);
        expect((error as Error).message).toEqual(
          '{ print: "incorrect" } is not valid: "incorrect" does not match the pattern /^-[a-zA-Z0-9](_string|_number)?$/'
        );
      }
    });

    it("throws an error if one of values in argvConfig is undefined", () => {
      const baseConfig = { print: false };
      const argvConfig = { print: undefined };
      try {
        newConfigFromArgv(baseConfig, argvConfig, []);
        throw new Error(); // in case newConfigFromArgv doesn't throw like it should
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidOptionSpecError);
        expect((error as Error).message).toEqual(
          "{ print: undefined } is not valid: value must be a string that matches the pattern /^-[a-zA-Z0-9](_string|_number)?$/"
        );
      }
    });
  });

  describe("when CLI args are incorrect", () => {
    it("throws an error when an unknown option is used", () => {
      const baseConfig = {};
      const argvConfig = {};
      const argv = ["-z"];
      try {
        newConfigFromArgv(baseConfig, argvConfig, argv);
        throw new Error(); // in case newConfigFromArgv doesn't throw like it should
      } catch (error) {
        expect(error).toBeInstanceOf(UnknownOptionError);
        expect((error as Error).message).toEqual("option -z is not a valid option");
      }
    });

    it("throws an error when an option argument is missing", () => {
      const baseConfig = { file: "" };
      const argvConfig = { file: "-f_string" };
      const argv = ["-f"];
      try {
        newConfigFromArgv(baseConfig, argvConfig, argv);
        throw new Error(); // in case newConfigFromArgv doesn't throw like it should
      } catch (error) {
        expect(error).toBeInstanceOf(ArgumentMissingError);
        expect((error as Error).message).toEqual(
          "option -f requires an argument but none was provided"
        );
      }
    });

    it("throws an error when an option argument that is expected to be a number is not a number", () => {
      const baseConfig = { padding: 0 };
      const argvConfig = { padding: "-p_number" };
      const argv = ["-p", "foo"];
      try {
        newConfigFromArgv(baseConfig, argvConfig, argv);
        throw new Error(); // in case newConfigFromArgv doesn't throw like it should
      } catch (error) {
        expect(error).toBeInstanceOf(ArgumentNotANumberError);
        expect((error as Error).message).toEqual(
          'option -p requires a numerical argument but was "foo"'
        );
      }
    });
  });
});
