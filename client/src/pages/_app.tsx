import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new Client({
    url: "http://localhost:4000/graphql",
    fetchOptions: { credentials: "include" },
    exchanges: [cacheExchange, fetchExchange],
  });

  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
