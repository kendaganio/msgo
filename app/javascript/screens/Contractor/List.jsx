import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import { Avatar, Button, Badge, Box, Flex, Text } from "@chakra-ui/core";

import PageHeader from "../../components/PageHeader";
import { fetchCollection } from "../../Api";
import { Table } from "../../components/Table";

const List = (props) => {
  let { url } = useRouteMatch();
  const [currentPage, setPage] = useState(1);

  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(
    ["contractors", { page: currentPage }],
    fetchCollection
  );

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <PageHeader
        title="Contractors"
        actions={
          <Button
            as={Link}
            leftIcon="add"
            variantColor="blue"
            variant="outline"
            size="sm"
            to={`${url}/new`}
          >
            Create new
          </Button>
        }
      />

      <Box p="4">
        <Table
          columns={[
            {
              Header: "Contractor Info",
              Cell: ({ row }) => (
                <Flex align="center">
                  <Avatar
                    src={row.original.image_url}
                    size="md"
                    mr="3"
                    showBorder
                  />
                  <Flex direction="column">
                    <Link
                      as={Text}
                      to={`/contractors/${row.original.id}`}
                      fontFamily="heading"
                      fontWeight="500"
                      color="gray.700"
                    >
                      {row.original.full_name}
                    </Link>
                    <Text fontSize="sm" color="gray.500">
                      {row.original.job_title}
                    </Text>
                  </Flex>
                </Flex>
              ),
              canSort: true,
            },
            {
              Header: "Daily Rate",
              Cell: ({ row }) => row.original.hourly_rate * 8,
            },
            {
              Header: "Status",
              Cell: ({ row }) => (
                <Badge
                  variantColor={
                    row.original.status === "inactive" ? "red" : "green"
                  }
                >
                  {row.original.status}
                </Badge>
              ),
            },
            {
              id: "actions",
              collapse: true,
              Header: () => null,
              Cell: ({ row, data }) => {
                return (
                  <Flex justify="flex-end">
                    <Button
                      as={Link}
                      to={`${url}/${row.original.id}`}
                      variantColor="orange"
                      variant="link"
                      size="sm"
                      mr="2"
                    >
                      View
                    </Button>
                    <Button
                      as={Link}
                      to={`${url}/${row.original.id}/edit`}
                      variantColor="blue"
                      variant="link"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </Flex>
                );
              },
            },
          ]}
          data={resolvedData.data}
          isLoading={isFetching}
          paginator={{
            setPage,
            currentPage,
            pageCount: 100,
          }}
        />
      </Box>
    </div>
  );
};

export default List;
