import React, { useMemo, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Button,
  Icon,
  IconButton,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  PseudoBox,
} from "@chakra-ui/core";

import useTableState from "../hooks/useTableState";

const Thead = (props) => (
  <Box as="thead" textAlign="left" roundedTop="lg" {...props} />
);
const Tbody = (props) => <Box as="tbody" {...props} />;
const Td = (props) => (
  <Box
    as="td"
    py="4"
    px="4"
    borderBottomWidth="1px"
    borderColor="gray.200"
    color="gray.700"
    isTruncated
    {...props}
  />
);
const Th = (props) => {
  return (
    <Box
      as="th"
      py="3"
      px="4"
      borderBottomWidth="1px"
      borderColor="gray.200"
      fontWeight="medium"
      bg="gray.200"
      color="gray.600"
      textTransform="uppercase"
      fontSize="xs"
      isTruncated
      {...props}
    />
  );
};

const Tr = (props) => (
  <PseudoBox
    as="tr"
    bg="gray.50"
    _hover={{
      bg: "gray.100",
    }}
    {...props}
  />
);

const Table = ({
  data,
  columns: cols,
  paginator = undefined,
  isLoading,
  onStateChange,
  ...props
}) => {
  const columns = useMemo(() => cols);

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    state,
  } = useTableState({
    columns,
    data,
  });

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 3 }}>
        <InputGroup my="2">
          <InputLeftElement
            children={<Icon name="search" color="gray.300" />}
          />
          <Input type="text" placeholder="Search..." />
        </InputGroup>
      </SimpleGrid>
      <Box overflowY="auto">
        <Box
          rounded="lg"
          d="inline-block"
          minW="full"
          overflow="hidden"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Box as="table" minW="full" {...props} {...getTableProps()}>
            <Thead>
              <Tr>
                {headers.map((column) => {
                  return (
                    <Th {...column.getHeaderProps()}>
                      {column.render()}{" "}
                      {column.sortable &&
                        (column.sortDirection === "asc"
                          ? "up"
                          : column.sortDirection === "desc"
                          ? "down"
                          : "")}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td
                          {...cell.getCellProps({
                            w: cell.column.collapse ? "0.0000000001%" : "1%",
                          })}
                        >
                          {cell.render()}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Box>
          {paginator && (
            <Flex
              bg="gray.50"
              px="4"
              py="2"
              align="center"
              justify="space-between"
            >
              <Text fontSize="sm" color="gray.600">
                Showing{" "}
                <Text as="span" color="gray.800" fontWeight="bold">
                  1
                </Text>{" "}
                to{" "}
                <Text as="span" color="gray.800" fontWeight="bold">
                  10
                </Text>{" "}
                of{" "}
                <Text as="span" color="gray.700" fontWeight="bold">
                  100
                </Text>{" "}
                records
              </Text>
              <Stack isInline spacing="1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginator.setPage(1)}
                >
                  First
                </Button>
                <IconButton
                  icon="chevron-left"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    paginator.setPage((old) => Math.max(old - 1, 0))
                  }
                  disabled={paginator.currentPage === 1}
                />
                <Flex align="center" px="2">
                  {paginator.currentPage}
                </Flex>
                <IconButton
                  icon="chevron-right"
                  variant="outline"
                  size="sm"
                  onClick={() => paginator.setPage((old) => old + 1)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    paginator.setPage((old) => paginator.pageCount)
                  }
                >
                  Last
                </Button>
              </Stack>
            </Flex>
          )}
        </Box>
      </Box>
    </>
  );
};

export { Table, Thead, Tbody, Td, Th, Tr };
