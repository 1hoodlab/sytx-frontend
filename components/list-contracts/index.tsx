import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import React from "react";
import ContractItem from "./card";

type Props = {};

export const ListContracts = (props: Props) => {
  return (
    <Box flex={1} h={"100%"} padding={"40px 35px 20px 35px"}>
      <ContractItem
        networkType="testnet"
        contractName="Minesweeper"
        brandUrl="https://cdn.worldvectorlogo.com/logos/binance-logo.svg"
        contractAddress="0xC56989b1117A219ADA00E213776093B098101a59"
      />
    </Box>
  );
};
