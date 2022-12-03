import axios from "axios";
import { forEach } from "lodash";
import { Terminal } from "xterm";
import { SystemCommand } from ".";
import { baseUrl } from "../../../constants";
import { TermColors } from "../constants";
import { colorize } from "../utils";

interface ContractDetail {
  abi_url: string;
  address: string;
  events: { name: string }[];
}
const info: SystemCommand = {
  id: "info",
  args: 0,
  description: "Get information detail of contract",
  usage: "info",
  exec: async (term: Terminal, args: string[], onProcessExit, contractInfo) => {
    let { data } = (await axios({
      baseURL: baseUrl,
      url: `/web3-transaction/contract/${contractInfo?.id}`,
    })) as { data: ContractDetail };
    term.writeln(
      `${colorize(TermColors.Purple, "ABI")}     ${contractInfo?.abi_url}`
    );
    term.writeln(
      `${colorize(TermColors.Purple, "Name")}    ${contractInfo?.name}`
    );
    term.writeln(
      `${colorize(TermColors.Purple, "Address")} ${contractInfo?.address}`
    );
    term.write(`${colorize(TermColors.Purple, "Events")}\r\n`);

    forEach(data.events, (e, i) => {
      term.write(`\t- ${e.name}`);
      if (i !== data.events.length - 1) {
        term.write(`\r\n`);
      }
    });
  },
};

export default info;
