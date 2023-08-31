/**
 * a string of the format `"-[letter]"` or `"-[letter](_string|_number)"`
 *
 * examples:
 * - "-a": an option with no arg
 * - "-b_string": an option with a string arg
 * - "-c_number": an option with a number arg
 */
export type OptionSpecString = string;

/**
 * maps config properties to CLI options
 *
 * example:
 *
 * if `config` is:
 *
 * `const config = { printExtraLines: false, inputFile: "", leftPaddingAmount: 10 }`
 *
 * then valid examples of `configToCLIOpt` would be:
 *
 * - `const configToCliOpt: ConfigToCLIOpt<typeof config> = { inputFile: "-f_string" }`
 * - `const configToCliOpt: ConfigToCLIOpt<typeof config> = { printExtraLines: "-x", inputFile: "-f_string", leftPaddingAmount: "-p_number" }`
 */
export type ConfigToCLIOpt<T> = Partial<{ [key in keyof T]: OptionSpecString }>;
