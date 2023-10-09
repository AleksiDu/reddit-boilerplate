import { Client, fetchExchange, Exchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { SSRExchange } from "@urql/next";

export const createUrqlClient = () => {
  return new Client({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [
      cacheExchange({
        updates: {
          Mutation: {
            login: (_results, _args, cache) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _results,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
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
};
