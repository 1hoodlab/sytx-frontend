import { Terminal } from "xterm";
import { SystemCommand } from ".";

const call: SystemCommand = {
  id: "call",
  args: -1,
  description: "Call function from smart contract",
  usage: "call <method name> param_1 param_2 ... param_n",
  exec: async (term: Terminal, args: string[]) => {},
};

export default call;
