import React from "react";
import { Heading, Flex, Divider } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      bg="gray.400"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="sm">Checker</Heading>
        <Divider />
      </Flex>
    </Flex>
  );
};

const datasContext = React.createContext({
    datas: [], fetchdatas: () => {}
})



export default Header;
