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
  const [sort, setSort] = useState({});

  const { status, resolvedData, error, isFetching } = usePaginatedQuery(
    ["contractors", { page: currentPage, order: sort }],
    fetchCollection,
    {
      retry: 2,
    }
  );

  if (status === "loading") {
    return <h1>Loading</h1>;
  }
  if (status === "error") {
    return <h1>{error}</h1>;
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
              id: "last_name",
              header: "Contractor Info",
              cell: ({ row }) => (
                <Flex align="center">
                  <Avatar src={row.image_url} size="md" mr="3" showBorder />
                  <Flex direction="column">
                    <Link
                      as={Text}
                      to={`/contractors/${row.id}`}
                      fontFamily="heading"
                      fontWeight="500"
                      color="gray.700"
                    >
                      {row.full_name}
                    </Link>
                    <Text fontSize="sm" color="gray.500">
                      {row.job_title}
                    </Text>
                  </Flex>
                </Flex>
              ),
              sortable: true,
            },
            {
              id: "hourly_rate",
              header: "Daily Rate",
              cell: ({ row }) => row.hourly_rate * 8,
              sortable: true,
            },
            {
              header: "Status",
              cell: ({ row }) => (
                <Badge
                  variantColor={row.status === "inactive" ? "red" : "green"}
                >
                  {row.status}
                </Badge>
              ),
              sortable: true,
            },
            {
              id: "actions",
              collapse: true,
              cell: ({ row }) => {
                return (
                  <Flex justify="flex-end">
                    <Button
                      as={Link}
                      to={`${url}/${row.id}`}
                      variantColor="orange"
                      variant="link"
                      size="sm"
                      mr="2"
                    >
                      View
                    </Button>
                    <Button
                      as={Link}
                      to={`${url}/${row.id}/edit`}
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
          onStateChange={(state) => {
            setSort(state.sort);
          }}
        />
      </Box>
    </div>
  );
};

export default List;
