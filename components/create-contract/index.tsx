import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Textarea,
  Th,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";

type Props = {};

export default function CreateContractInfo({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const uploadRef = useRef(null);
  return (
    <>
      <Button
        borderRadius={"0px"}
        fontSize={"20px"}
        position={"relative"}
        color={"black"}
        onClick={onOpen}
        fontWeight={"bold"}
      >
        Create
      </Button>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg={"rgba(38, 38, 38, 0.84)"}
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent bg={"black"} border={"2px solid #8000FF"}>
          <ModalHeader color={"white"}>Create contract Information</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody
            color={"white"}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <Grid templateColumns="repeat(12, 1fr)" alignItems={"center"}>
              <GridItem colSpan={3}>
                <Text fontWeight={"600"} whiteSpace={"nowrap"}>
                  Contract name
                </Text>
              </GridItem>
              <GridItem colSpan={9}>
                <Input
                  variant="flushed"
                  placeholder="0xC56989b1117A219ADA00E213776093B098101a59"
                />
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" alignItems={"center"}>
              <GridItem colSpan={3}>
                <Text fontWeight={"600"} whiteSpace={"nowrap"}>
                  ABI File
                </Text>
              </GridItem>
              <GridItem colSpan={9}>
                <Input type={"file"} id="upload-btn" hidden />
                <label htmlFor="upload-btn" className="sytx-upload__btn">
                  Upload
                </label>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" alignItems={"center"}>
              <GridItem colSpan={3}>
                <Text fontWeight={"600"} whiteSpace={"nowrap"}>
                  Network
                </Text>
              </GridItem>
              <GridItem colSpan={9}>
                <Select placeholder="Select option" className="sytx-select">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </GridItem>
            </Grid>
            <Stack>
              <Text fontWeight={"600"} whiteSpace={"nowrap"}>
                Event
              </Text>
              <Spacer />
              <Textarea
                _focus={{
                  border: "1px solid #ffffff",
                }}
                fontSize={"13px"}
                height={"130px"}
                resize={"none"}
                fontWeight={"bold"}
                fontFamily={"'Roboto Mono', monospace;"}
                placeholder="eg: BuyBox(buyer, numberOfTurns)"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"pink"}
              mr={3}
              onClick={onClose}
              borderRadius={0}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
