import {
  Button,
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
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { Network } from "../../pages";
import axios from "axios";
import { baseUrl } from "../../constants";
import { transformEvent } from "../../utils";
import { map, trim } from "lodash";
interface IProps {
  networks: Network[];
}

interface IABI {
  filename: string;
  url: string;
}

export default function CreateContractInfo({ networks }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contractName, setContractName] = React.useState("");
  const [contractAddress, setContractAddress] = React.useState("");
  const [networkId, setNetworkId] = useState<number | null>(null);
  const [ABI, setABI] = useState<IABI | null>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [eventRaws, setEvents] = useState<string>("");
  const handleUploadFirebase = async (abiData: FormData) => {
    return await axios({
      method: "POST",
      url: `${baseUrl}/firebase/upload-abi`,
      data: abiData,
    });
  };
  const handleUploadABIFile = async (e: any) => {
    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("abiFile", e.target.files[0]);
      let { data } = await handleUploadFirebase(formData);
      if (data) {
        setUploadLoading(false);

        setABI({
          filename: data.filename,
          url: data.url,
        });
      }
    } catch (error) {
      setUploadLoading(false);
    }
  };

  const _createContract = async (contract: {
    contractName: string;
    abiUrl: string;
    contractAddress: string;
    networkSupportId: number | null;
    events: (
      | {
          name: string;
          params: string[];
        }
      | undefined
    )[];
  }) => {
    let { data } = await axios({
      method: "POST",
      url: `${baseUrl}/web3-transaction/create-contract`,
      data: contract,
    });
    return data;
  };
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      let events = map(eventRaws.split("\n"), trim).map((e) =>
        transformEvent(e)
      );
      let data = await _createContract({
        contractName: contractName,
        contractAddress: contractAddress,
        abiUrl: ABI?.url as string,
        events: events,
        networkSupportId: networkId,
      });
      if (data) {
        setSubmitLoading(false);
        onClose();
      }
    } catch (error) {
      setSubmitLoading(false);
    }
  };
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
                  Contract name <span className="sytx-require">*</span>
                </Text>
              </GridItem>
              <GridItem colSpan={9}>
                <Input
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  variant="flushed"
                  placeholder="Minesweeper"
                />
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" alignItems={"center"}>
              <GridItem colSpan={3}>
                <Text fontWeight={"600"} whiteSpace={"nowrap"}>
                  Contract address <span className="sytx-require">*</span>
                </Text>
              </GridItem>
              <GridItem colSpan={9}>
                <Input
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  variant="flushed"
                  placeholder="0xC56989b1117A219ADA00E213776093B098101a59"
                />
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" alignItems={"center"}>
              <GridItem colSpan={3}>
                <Text fontWeight={"600"} whiteSpace={"nowrap"}>
                  ABI File <span className="sytx-require">*</span>
                </Text>
              </GridItem>
              <GridItem colSpan={9}>
                {!ABI ? (
                  <>
                    <Input
                      type={"file"}
                      id="upload-btn"
                      hidden
                      accept=".json"
                      onChange={(e) => handleUploadABIFile(e)}
                    />
                    <label htmlFor="upload-btn" className="sytx-upload__btn">
                      {!uploadLoading ? "Upload" : "Loading..."}
                    </label>
                  </>
                ) : (
                  <Link
                    href={ABI?.url}
                    style={{ color: "#FED049" }}
                    target="_blank"
                  >
                    {ABI?.filename}
                  </Link>
                )}
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" alignItems={"center"}>
              <GridItem colSpan={3}>
                <Text fontWeight={"600"} whiteSpace={"nowrap"}>
                  Network <span className="sytx-require">*</span>
                </Text>
              </GridItem>
              <GridItem colSpan={9}>
                <Select
                  placeholder="Select option"
                  className="sytx-select"
                  onChange={(e) => {
                    setNetworkId(parseInt(e.target.value));
                  }}
                >
                  {networks &&
                    networks?.map((network, index) => (
                      <option value={network.id} key={index}>
                        {network.name}
                      </option>
                    ))}
                </Select>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"pink"}
              mr={3}
              isDisabled={
                !contractAddress || !contractName || !ABI?.url || !networkId
              }
              isLoading={submitLoading || uploadLoading}
              onClick={handleSubmit}
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
