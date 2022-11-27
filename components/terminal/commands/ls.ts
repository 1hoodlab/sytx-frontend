import { Terminal } from "xterm";
import { SystemCommand, SystemCommands } from ".";
import { TermColors } from "../constants";
import { colorize, getSpacing } from "../utils";

const ls: SystemCommand = {
  id: "ls",
  args: 2,
  description: "Get list events or method of smart contract",
  usage: "ls event | ls method",
  exec: async (term: Terminal, args: string[]) => {},
};

export default ls;
