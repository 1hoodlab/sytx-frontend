import axios from "axios";
import { Terminal } from "xterm";
import { SystemCommand, SystemCommands } from ".";
import { baseUrl } from "../../../constants";
import { TermColors } from "../constants";
import { colorize, getSpacing } from "../utils";

const find: SystemCommand = {
  id: "find",
  args: 2,
  description: "Get event information from txhash",
  usage: "find <event name> <txHash>",
  exec: async (term: Terminal, args: string[], onProcessExit, contractInfo) => {
    let { data } = await axios({
      method: "POST",
      baseURL: baseUrl,
      url: `web3-transaction/${contractInfo?.address}/transaction`,
      data: {
        myAddress: localStorage.getItem("myaddress") as string,
        txHash: args[1],
        eventName: args[0],
      },
    });
    term.write(JSON.stringify(data));
    console.log(data);
  },
};

export default find;
