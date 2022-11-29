import { Terminal } from "xterm";
import { SystemCommand, SystemCommands } from ".";
import { TermColors } from "../constants";
import { colorize, getSpacing } from "../utils";

const help: SystemCommand = {
  id: "help",
  args: 0,
  exec: async (term: Terminal, args: string[]) => {
    term.writeln("Available commands:");
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
    term.writeln("Storage value:");
    
  },
};

export default help;
