import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import CreateContractInfo from "../components/create-contract";
import { ListContracts } from "../components/list-contracts";
const TerminalComponent = dynamic(
  () => import("../components/terminal/terminal.component"),
  {
    ssr: false,
  }
);
export default function Home() {
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
          <ListContracts />
          <CreateContractInfo />
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
          <TerminalComponent contractName="Minesweeper" />
        </Box>
      </Box>
    </Box>
  );
}
