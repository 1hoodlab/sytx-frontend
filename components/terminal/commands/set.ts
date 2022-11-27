import axios from "axios";
import { Terminal } from "xterm";
import { SystemCommand, SystemCommands } from ".";

const set: SystemCommand = {
  id: "set",
  args: 2,
  description: "Get event information from txhash",
  usage: "find <event name> <address wallet> <txHash>",
  exec: async (term: Terminal, args: string[], onProcessExit, contractInfo) => {
    localStorage.setItem(args[0] as string, args[1] as string);
  },
};

export default set;
