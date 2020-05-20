import React from "react";
import { Spinner, Flex } from "@chakra-ui/core";

const FullPageLoader = (props) => {
  return (
    <Flex
      h="100vh"
      w="100vw"
      pos="fixed"
      top="0"
      left="0"
      bg="gray.300"
      opacity="0.6"
      zIndex="tooltip"
      align="center"
      justify="center"
    >
      <Spinner color="blue.500" thickness="5px" size="xl" />
    </Flex>
  );
};

export default FullPageLoader;
