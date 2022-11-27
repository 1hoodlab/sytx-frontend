import { Terminal } from "xterm";
import { SystemCommand, SystemCommands } from ".";
import { TermColors } from "../constants";
import { colorize, getSpacing } from "../utils";

const find: SystemCommand = {
  id: "find",
  args: 2,
  description: "Get event information from txhash",
  usage: "find <event name> txHash",
  exec: async (term: Terminal, args: string[]) => {},
};

export default find;
