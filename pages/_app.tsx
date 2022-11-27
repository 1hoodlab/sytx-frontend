
import "../styles/globals.scss";
import "xterm/css/xterm.css";

import type { AppProps } from "next/app";
import { Box, ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box h={"100vh"} backgroundColor={"black"} color={"white"}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
