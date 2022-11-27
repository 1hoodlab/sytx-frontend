import { Terminal } from "xterm";
import { TermColors } from "../constants";
import { colorize, getSpacing } from "../utils";

export type SystemCommand = {
  id: string;
  args: number;
  usage?: string;
  description?: string;
  process?: boolean;
  loaded?: boolean;
  exec?(term: Terminal, _args: string[], onProcessExit?: any): Promise<any>;
};
const SystemCommands: SystemCommand[] = [
  {
    id: "help",
    args: 0,
    description: "show manual pages for a command",
    exec: async (term: Terminal, _args: string[]) => {
      term.writeln("available commands:");
      // Add 3 tabs for spacing. Align each description to the first command description
      const firstCommandSpacing = SystemCommands[0].id.length + 12;
      for (const { id, description } of SystemCommands) {
        if (id === "help") continue;

        term.writeln(
          "\t" +
            colorize(TermColors.Green, id) +
            getSpacing(firstCommandSpacing - id.length) +
            description
        );
      }
    },
  },
];
export async function exec(
  term: Terminal,
  userInput: string,
  onProcessExit: any
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
  command.exec && (await command.exec(term, args, onProcessExit));
  if (command.process) {
    return command.id;
  }

  return null;
}
