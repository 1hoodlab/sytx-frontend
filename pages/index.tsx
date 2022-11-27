import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import CreateContractInfo from "../components/create-contract";
import { ListContracts } from "../components/list-contracts";
import { NetWorkType } from "../components/list-contracts/card";
import { baseUrl } from "../constants";
const TerminalComponent = dynamic(
  () => import("../components/terminal/terminal.component"),
  {
    ssr: false,
  }
);

export interface Network {
  id: number;
  name: string;
  icon_network_url: string;
  icon_currency_url: string;
  rpc_url: string;
  rpc_url_backup: string;
  chain_id: number;
  type: NetWorkType;
  currency_symbol: string;
  block_explorer_url: string;
}
export interface Contract {
  abi_url: string;
  address: string;
  id: string;
  name: string;
  network_support: Network;
}

interface IProps {
  networks: Network[];
  contracts: Contract[];
}
export default function Home({ networks, contracts }: IProps) {
  const [contractInfo, setContractInfo] = useState<Contract | undefined>(
    undefined
  );
  return (
    <Box
      height={"full"}
      display={"flex"}
      padding={"50px 33px 33px 33px"}
      gap={"30px"}
    >
      <Box
        border={"2px solid #FFFFFF"}
        h={"full"}
        w={"30%"}
        borderRadius={"5px"}
      >
        <Text
          fontSize={"25px"}
          fontWeight={700}
          background={"black"}
          position={"absolute"}
          top={"20px"}
          left={"50px"}
          display={"inline-block"}
          padding={"10px"}
        >
          Contracts
        </Text>
        <Flex direction={"column"} height={"inherit"}>
          <ListContracts
            contracts={contracts}
            setContractInfo={setContractInfo}
          />
          <CreateContractInfo networks={networks} />
        </Flex>
      </Box>
      <Box
        border={"2px solid #FFFFFF"}
        h={"full"}
        flex={1}
        position={"relative"}
        borderRadius={"5px"}
      >
        <Text
          fontSize={"25px"}
          fontWeight={"bold"}
          background={"black"}
          position={"absolute"}
          top={"-30px"}
          left={"50px"}
          display={"inline-block"}
          padding={"10px"}
        >
          Command Line
        </Text>
        <Box
          padding={"40px 20px 20px 20px"}
          overflow={"hidden"}
          boxSizing={"border-box"}
          position={"relative"}
          height={"inherit"}
        >
          {contractInfo && <TerminalComponent contract={contractInfo} />}
        </Box>
      </Box>
    </Box>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const [networks, contracts] = await Promise.all([
    axios(baseUrl + "/web3-transaction/networks"),
    axios(baseUrl + "/web3-transaction/contracts"),
  ]);

  // Pass data to the page via props
  return { props: { networks: networks.data, contracts: contracts.data } };
}
