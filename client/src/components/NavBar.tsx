import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

const NavBar = () => {
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  console.log("me", fetching)

  // data is loading
  if (fetching){

    // is not logged in
  } else if(!data?.me){
    body = (
      <>
        <Link mr={2} as={NextLink} href={"/login"}>
          login
        </Link>
        <Link as={NextLink} href={"/register"}>
          register
        </Link>
      </>
    )
    // is logged in
  } else {
      body = (
              <Flex>
                <Box mr={2}>
                  {data.me.username}
                </Box>
                <Button variant="link">logout</Button>
              </Flex>
              )
        
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>
       {body}
      </Box>
    </Flex>
  );
};

export default NavBar;
