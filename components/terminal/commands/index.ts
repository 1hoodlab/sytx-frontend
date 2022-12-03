import { Contract } from "./../../../pages/index";
import { Terminal } from "xterm";
import { TermColors } from "../constants";
import { colorize } from "../utils";
import call from "./call";
import find from "./find";
import help from "./help";
import set from "./set";
import info from "./info";
import storage from "./storage";
import findall from "./findall";

export type SystemCommand = {
  id: string;
  args: number;
  usage?: string;
  description?: string;
  process?: boolean;
  loaded?: boolean;
  exec?(
    term: Terminal,
    _args: string[],
    onProcessExit?: any,
    contractInfo?: Contract
  ): Promise<any>;
};
export const SystemCommands: SystemCommand[] = [
  help,
  call,
  find,
  storage,
  set,
  info,
  findall,
];

export async function exec(
  term: Terminal,
  userInput: string,
  onProcessExit: any,
  contractInfo?: Contract
) {
  const [input, ...args] = userInput.split(/\s+/);
  const command = SystemCommands.find((c) => c.id === input);
  if (!command) {
    throw new Error(
      'Command not found. Type "help" to list available commands'
    );
  }

  if (command.args === 0 && args.length > 0) {
    throw new Error(`${command.id} does not accept arguments`);
  }

  if (
    (command.args === -1 && args.length === 0) ||
    (command.args !== -1 && command.args !== args.length)
  ) {
    throw new Error(
      "not enough arguments\r\n" +
        colorize(TermColors.Reset, `usage: ${command.usage}`)
    );
  }

  //   await command.exec(term, args, onProcessExit);
  command.exec && (await command.exec(term, args, onProcessExit, contractInfo));
  if (command.process) {
    return command.id;
  }

  return null;
}
