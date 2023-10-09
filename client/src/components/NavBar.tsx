import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import {useLogoutMutation, useMeQuery, RegularUserFragment } from "../generated/graphql";
import { isServer } from "../utils/isServer";


const NavBar = () => {
  const [{fetching:logoutFetching},logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({pause: isServer()});

  let body = null;


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

    const user = data.me as RegularUserFragment;

      body = (
              <Flex>
                <Box mr={2}>
                  {user.username}
                </Box>
                <Button onClick={()=> logout({})} isLoading={logoutFetching} variant="link">logout</Button>
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
