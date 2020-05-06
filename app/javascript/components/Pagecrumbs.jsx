import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/core";

const PageCrumbs = (props) => {
  const location = useLocation();
  const urlTokens = location.pathname.split("/");

  function getToken(token) {
    if (token === "") {
      return "Home";
    }

    return token;
  }

  function getLink(tokens, i) {
    const partialArr = tokens.slice(0, i + 1);
    return partialArr.join("/");
  }

  return (
    <Box bg="gray.50" px="6" py="2" shadow="sm" fontSize="sm" {...props}>
      <Breadcrumb
        spacing="2"
        separator={
          <Box fontSize="xs" color="gray.500">
            /
          </Box>
        }
      >
        {urlTokens.map((token, index) => (
          <BreadcrumbItem
            key={index}
            isCurrentPage={index === urlTokens.length - 1}
          >
            <BreadcrumbLink
              as={Link}
              to={getLink(urlTokens, index)}
              fontSize="xs"
              color="gray.600"
              textTransform="uppercase"
            >
              {getToken(token)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  );
};

export default PageCrumbs;
