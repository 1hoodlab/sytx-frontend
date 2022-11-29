import axios from "axios";
import { Terminal } from "xterm";
import { SystemCommand } from ".";
import { insertDataStorage, STORAGE_KEY } from "../../../utils";

const set: SystemCommand = {
  id: "set",
  args: 2,
  description: "Set local value",
  usage: "set <param key> <param value>\r\nexample: set myaddress 0x234...53e",
  exec: async (term: Terminal, args: string[], onProcessExit, contractInfo) => {
    insertDataStorage(args[0], args[1]);
  },
};

export default set;
