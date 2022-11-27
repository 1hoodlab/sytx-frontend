import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function CreateContractInfo({}: Props) {
  return (
    <Button
      borderRadius={"0px"}
      fontSize={"20px"}
      position={"relative"}
      color={"black"}
      fontWeight={"bold"}
    >
      Create
    </Button>
  );
}
