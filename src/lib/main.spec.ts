import { newConfigFromArgv } from "./main.js";

describe("newConfigFromArgv", () => {
  describe("overall behaviour", () => {
    it("returns a copy of the config", () => {
      const config = {};
      const configCli = {};
      const { newConfig } = newConfigFromArgv(config, configCli, []);
      expect(newConfig).toEqual(config);
      expect(newConfig).not.toBe(config);
    });
  });

  describe("normal behaviour", () => {
    it("updates config props that are booleans", () => {
      const config = { print: false };
      const configCli = { print: "-p" };
      const { newConfig } = newConfigFromArgv(config, configCli, ["-p"]);
      expect(newConfig).toEqual({ print: true });
    });

    it("updates config props that are strings", () => {
      const config = { file: "" };
      const configCli = { file: "-f_string" };
      const { newConfig } = newConfigFromArgv(config, configCli, ["-f", "input.txt"]);
      expect(newConfig).toEqual({ file: "input.txt" });
    });

    it("updates config props that are integers or floats", () => {
      const config = { padding: 0, degree: 0 };
      const configCli = { padding: "-p_number", degree: "-d_number" };
      const { newConfig } = newConfigFromArgv(config, configCli, ["-p", "30", "-d", "10.5"]);
      expect(newConfig).toEqual({ padding: 30, degree: 10.5 });
    });

    it("returns rest of command line as operands", () => {
      const config = { print: false };
      const configCli = { print: "-p" };
      const { newConfig, operands } = newConfigFromArgv(config, configCli, ["-p", "a", "b", "c"]);
      expect(newConfig).toEqual({ print: true });
      expect(operands).toEqual(["a", "b", "c"]);
    });
  });

  describe("'--' syntax", () => {
    it("treats anything after '--' as operands", () => {
      const config = { print: false };
      const configCli = { print: "-p" };
      const { operands } = newConfigFromArgv(config, configCli, ["--", "-p"]);
      expect(operands).toEqual(["-p"]);
    });
  });

  describe("when configCli contains coding errors", () => {
    it("throws an error if a property does not exist in the config", () => {
      const config = { print: false };
      const configCli = { incorrect: "-p" };
      expect(() => newConfigFromArgv(config, configCli as object, [])).toThrow(
        new Error(
          'the option spec { incorrect: "-p" } is not valid: property "incorrect" is not a property of the config object'
        )
      );
    });

    it("throws an error if an option spec is not valid", () => {
      const config = { print: false };
      const configCli = { print: "incorrect" };
      expect(() => newConfigFromArgv(config, configCli, [])).toThrow(
        new Error(
          'the option spec { print: "incorrect" } is not valid: "incorrect" does not match the pattern "-[letter]" or "-[letter](_string|_number)"'
        )
      );
    });

    it("throws an error if an option spec is undefined", () => {
      const config = { print: false };
      const configCli = { print: undefined };
      expect(() => newConfigFromArgv(config, configCli, [])).toThrow(
        new Error(
          'the option spec { print: undefined } is not valid: a valid option spec needs to be a string matching the pattern "-[letter]" or "-[letter](_string|_number)"'
        )
      );
    });
  });

  describe("when CLI args are incorrect", () => {
    it("throws an error when an unknown option is used", () => {
      const config = {};
      const configCli = {}; // no "-z" option specified
      expect(() => newConfigFromArgv(config, configCli, ["-z"])).toThrow(
        new Error("option -z is not a valid option")
      );
    });

    it("throws an error when an option argument is missing", () => {
      const config = { file: "" };
      const configCli = { file: "-f_string" };
      expect(() => newConfigFromArgv(config, configCli, ["-f" /* missing arg */])).toThrow(
        new Error("option -f requires an argument but none was provided")
      );
    });

    it("throws an error when an option argument that is expected to be a number is not a number", () => {
      const config = { padding: 0 };
      const configCli = { padding: "-p_number" };
      expect(() => newConfigFromArgv(config, configCli, ["-p", "foo" /* not a number */])).toThrow(
        new Error('option -p requires a numerical argument but was "foo"')
      );
    });
  });
});
