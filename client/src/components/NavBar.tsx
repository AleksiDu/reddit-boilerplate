import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

const NavBar = () => {
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  console.log("data", data);

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>
        <Link mr={2} as={NextLink} href={"/login"}>
          login
        </Link>
        <Link as={NextLink} href={"/register"}>
          register
        </Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
