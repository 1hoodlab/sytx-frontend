import { Box, Card, CardBody, Text, Image } from "@chakra-ui/react";
import React from "react";
import { beautifyAddress } from "../../utils";

export enum NetWorkType {
  mainnet = "mainnet",
  testnet = "testnet",
}
interface IProps {
  networkType: NetWorkType;
  brandUrl: string;
  contractName: string;
  contractAddress: string;
  setContractInfo: any;
  isActive?: boolean;
}

export default function ContractItem({
  networkType,
  brandUrl,
  contractName,
  contractAddress,
  isActive = false,
  setContractInfo,
}: IProps) {
  return (
    <Card
      onClick={setContractInfo}
      bg={"rgba(217, 217, 217, 0.1);"}
      color={"white"}
      cursor={"pointer"}
      className={isActive ? "card-active" : ""}
      _hover={{
        border: "1px solid #8000FF",
        transitionDuration: "0.3s",
      }}
    >
      <Box
        border={"2px solid black"}
        w={"fit-content"}
        bg={networkType === NetWorkType.testnet ? "#313AFF" : "#FF4A31;"}
        borderRadius={"5px"}
        transform={"rotate(-90deg);"}
        padding={"3px 10px 3px 10px"}
        fontSize={"8px"}
        top={"30px"}
        left={"-29px"}
        position={"absolute"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
      >
        {networkType}
      </Box>
      <CardBody
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Text fontWeight={"bold"} fontSize={"15px"} letterSpacing={"0.04em"}>
            {contractName}
          </Text>
          <Text fontFamily={"'Jura', sans-serif;"} fontSize={"13px"}>
            {beautifyAddress(contractAddress, 5, 10)}
          </Text>
        </Box>
        <Box>
          <Image src={brandUrl} w={"30px"} />
        </Box>
      </CardBody>
    </Card>
  );
}
