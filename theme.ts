import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Chakra Petch', sans-serif;`,
  },
  colors: {
    black: {
      100: "#000000",
      200: "#202226",
      300: "#B8BDC9",
    },
    white: {
      200: "#F1F1F1",
    },
    blue: {
      100: "#1463FF",
      200: "#1D90F4",
      300: "#C5EBFF",
      500: "#1463FF",
    },
  },
});

export default theme;
