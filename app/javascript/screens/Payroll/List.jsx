import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Badge, Button, Box, Flex } from "@chakra-ui/core";

import PageHeader from "../../components/PageHeader";
import { fetchPayrolls } from "../../Api";
import { Table } from "../../components/Table";

const List = (props) => {
  const { status, data, error } = useQuery("payrolls", fetchPayrolls());

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <PageHeader
        title="Payrolls"
        actions={
          <Button
            as={Link}
            leftIcon="add"
            variantColor="blue"
            variant="outline"
            size="sm"
            to={`/payrolls/new`}
          >
            Create new
          </Button>
        }
      />

      <Box p="4">
        <Table
          columns={[
            { id: "name", header: "Name", accessor: "name" },
            { id: "start_date", header: "From", accessor: "start_date" },
            { id: "end_date", header: "To", accessor: "end_date" },
            {
              header: "Status",
              cell: ({ row }) => (
                <Badge
                  mr="2"
                  variantColor={row.status === "final" ? "green" : "orange"}
                >
                  {row.status}
                </Badge>
              ),
            },
            {
              id: "actions",
              header: () => null,
              cell: ({ row, ...props }) => {
                return (
                  <Flex justify="flex-end">
                    <Button
                      as={Link}
                      to={`/payrolls/${row.id}`}
                      variantColor="orange"
                      variant="link"
                      size="sm"
                      mr="4"
                    >
                      View
                    </Button>
                  </Flex>
                );
              },
            },
          ]}
          data={data.data}
        />
      </Box>
    </div>
  );
};

export default List;
