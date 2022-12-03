import axios from "axios";
import { forEach, get, keys, values } from "lodash";
import { Terminal } from "xterm";
import { SystemCommand } from ".";
import { baseUrl } from "../../../constants";

const findall: SystemCommand = {
  id: "findall",
  args: 2,
  description: "Get events information from start block",
  usage: "findall --event=<event_name> --start=<start_block>",
  exec: async (term: Terminal, args: string[], onProcessExit, contractInfo) => {
    const regexEventName = /^--event=(?<eventName>\w+)$/im;
    const regexStartBlock = /^--start=(?<startBlock>\w+)$/im;

    var data: { [key: string]: any } = {};
    forEach(args, (arg) => {
      let rs = regexEventName.exec(arg) || regexStartBlock.exec(arg);
      if (!rs) throw new Error("param not match!");

      let key = keys(rs.groups)[0] as string;
      let value = values(rs.groups)[0];

      data[key] = value;
    });

    data["startBlock"] = parseInt(data["startBlock"]);

    let rs = await axios({
      method: "POST",
      baseURL: baseUrl,
      url: `web3-transaction/${contractInfo?.address}/find-all/event`,
      data: data,
    });

    term.write(JSON.stringify(rs.data));
  },
};

export default findall;
