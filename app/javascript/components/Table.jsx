import React, { useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import {
  Box,
  Flex,
  Stack,
  Button,
  IconButton,
  Text,
  Input,
  PseudoBox,
} from "@chakra-ui/core";

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
const Th = (props) => (
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
  ...props
}) => {
  const columns = useMemo(() => cols);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data,
  });

  return (
    <Box overflowY="auto">
      <Box
        rounded="lg"
        d="inline-block"
        minW="full"
        overflow="hidden"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Box as="table" minW="full" {...props} {...getTableProps}>
          <Thead>
            <>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td
                        {...cell.getCellProps({
                          w: cell.column.collapse ? "0.0000000001%" : "1%",
                        })}
                      >
                        {cell.render("Cell")}
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
                onClick={() => paginator.setPage((old) => Math.max(old - 1, 0))}
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
                onClick={() => paginator.setPage((old) => paginator.pageCount)}
              >
                Last
              </Button>
            </Stack>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export { Table, Thead, Tbody, Td, Th, Tr };
