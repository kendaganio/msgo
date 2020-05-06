import React from "react";
import { Heading, Flex } from "@chakra-ui/core";

const Footer = (props) => {
  return (
    <Flex w="full" bg="gray.700" color="gray.50" p="4">
      <Heading as="h4" size="md">
        Footer
      </Heading>
    </Flex>
  );
};

export default Footer;
