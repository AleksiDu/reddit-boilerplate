import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { Client, Exchange, Provider, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { LogoutMutation, MeDocument, MeQuery } from "../generated/graphql";
import { betterUpdateQuery } from "../utils/betterUpdateQuery";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new Client({
    url: "http://localhost:4000/graphql",
    fetchOptions: { credentials: "include" },
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {
            logout: (_results, _args, cache) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _results,
                () => ({ me: null })
              );
            },
          },
        },
      }),
      fetchExchange,
    ],
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
