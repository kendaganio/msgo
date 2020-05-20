import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  PseudoBox,
  Image,
} from "@chakra-ui/core";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

import logo from "../images/msgo-logo-white.svg";

const MenuItems = ({ children, ...props }) => (
  <PseudoBox
    as={Link}
    mt={{ base: 0, md: 0 }}
    d="block"
    py="2"
    px={{ base: 1, md: 4 }}
    mt={{ base: 1, md: 0 }}
    textAlign={{ base: "center", md: "left" }}
    rounded="md"
    fontFamily="heading"
    fontWeight="500"
    fontSize="sm"
    _hover={{
      bg: "blue.600",
      color: "blue.50",
    }}
    {...props}
  >
    {children}
  </PseudoBox>
);

const Header = (props) => {
  const user = useUser();
  const { logout } = useAuth();

  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      p={{ base: 4, md: 2 }}
      px={{ base: 6, md: 6 }}
      bg="blue.700"
      color="gray.100"
      borderBottomWidth="1px"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as={Link} size="md" to="/">
          <Image src={logo} maxH="25px" />
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="currentColor"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ xs: show ? "block" : "none", md: "flex" }}
        width={{ xs: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems onClick={handleToggle} to="/contractors">
          Contractors
        </MenuItems>
        <MenuItems onClick={handleToggle} to="/attendances">
          Attendance
        </MenuItems>
        <MenuItems onClick={handleToggle} to="/payrolls">
          Payroll
        </MenuItems>
      </Box>

      <Flex
        display={{ xs: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button variantColor="orange" size="sm" onClick={logout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
