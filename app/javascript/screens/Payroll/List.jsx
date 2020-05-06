import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, Box, Flex } from "@chakra-ui/core";

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
            { Header: "Name", accessor: "name" },
            { Header: "From", accessor: "start_date" },
            { Header: "To", accessor: "end_date" },
            {
              Header: () => null,
              id: "actions",
              Cell: ({ row, data }) => {
                return (
                  <Flex justify="flex-end">
                    <Button
                      as={Link}
                      to={`/payrolls/${row.original.id}`}
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
