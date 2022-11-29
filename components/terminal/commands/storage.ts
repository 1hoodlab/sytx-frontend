import { Terminal } from "xterm";
import { SystemCommand } from ".";

const storage: SystemCommand = {
  id: "storage",
  args: 1,
  description: "Get list events or method of smart contract",
  usage: "ls event | ls method",
  exec: async (term: Terminal, args: string[]) => {},
};

export default storage;
