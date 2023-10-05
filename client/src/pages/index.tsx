import { useMemo } from "react";
import { Client, ssrExchange } from "urql/core";
import NavBar from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UrqlProvider } from "@urql/next";

const Index = () => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createUrqlClient();
    return [client as Client, ssr];
  }, []);

  console.log("client", client);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <NavBar />
    </UrqlProvider>
  );
};

export default Index;
