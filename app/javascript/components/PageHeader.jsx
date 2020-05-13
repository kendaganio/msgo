import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/core";

const PageHeader = ({
  title,
  actions = undefined,
  children = null,
  ...props
}) => {
  return (
    <Flex
      p="4"
      px="6"
      bg="white"
      borderBottomWidth="1px"
      shadow="sm"
      align="center"
      justify="space-between"
    >
      <Box>
        <Heading as="h1" size="lg" color="gray.700">
          {title}
        </Heading>
        {children && children}
      </Box>
      <Box>{actions}</Box>
    </Flex>
  );
};

export default PageHeader;
