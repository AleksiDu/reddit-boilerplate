import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import { useMemo } from "react";
import { ssrExchange, Client } from "urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UrqlProvider } from "@urql/next";

function MyApp({ Component, pageProps }: AppProps) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createUrqlClient();
    return [client as Client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </UrqlProvider>
  );
}

export default MyApp;
