import React from "react";
import { Box, Heading, Text } from "@chakra-ui/core";

const StatCard = ({
  variant = "text",
  color = "gray.600",
  heading,
  children,
  ...props
}) => {
  return (
    <Box bg="gray.50" padding="4" rounded="md" borderWidth="1px">
      <Heading as="h3" size="sm" mb="2">
        {heading}
      </Heading>
      {variant === "text" && (
        <Text fontSize="2xl" color={color}>
          {children}
        </Text>
      )}
    </Box>
  );
};

export default StatCard;
