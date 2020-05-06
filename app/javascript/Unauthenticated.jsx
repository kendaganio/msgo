import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import {
  Flex,
  Box,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/core";

const Unauthenticated = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, login, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Flex align="center" justify="center" bg="blue.600" minH="100vh">
      <form onSubmit={handleSubmit}>
        <Box
          bg="white"
          p="4"
          rounded="lg"
          borderWidth="1px"
          shadow="lg"
          w={{ base: "full", md: "md" }}
        >
          <Heading as="h1">Sign in</Heading>
          <Divider my="4" />
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              id="email"
              aria-describedby="email-helper-text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="password"
              aria-describedby="password-helper-text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={6} mr="2" variantColor="blue" type="submit">
            Login
          </Button>
          <Button
            mt={6}
            variantColor="blue"
            variant="ghost"
            onClick={() => alert("wuhoo, this does nothing")}
          >
            Register
          </Button>
        </Box>
      </form>
    </Flex>
  );
};

export default Unauthenticated;
