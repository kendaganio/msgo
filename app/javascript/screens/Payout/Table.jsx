import React from "react";
import { parseISO, format } from "date-fns";
import { Avatar, Flex, Text } from "@chakra-ui/core";

import { Table } from "../../components/Table";

const PayoutTable = ({
  showContractor = true,
  showActions = true,
  isFetching = false,
  data,
  ...props
}) => {
  return (
    <div>
      <Table
        columns={[
          ...(showContractor
            ? [
                {
                  id: "last_name",
                  header: "Contractor Info",
                  cell: ({ row }) => (
                    <Flex align="center">
                      <Avatar src={row.image_url} size="md" mr="3" showBorder />
                      {row.full_name}
                    </Flex>
                  ),
                },
              ]
            : []),
          {
            header: "Paid At",
            cell: ({ row }) => format(parseISO(row.paid_at), "MMMM d, yyyy"),
          },
          {
            header: "Amount",
            cell: ({ row }) => (
              <Text color={row.cash_advance ? "red.600" : "green.600"}>
                {row.amount}
              </Text>
            ),
          },
          {
            header: "Notes",
            accessor: "notes",
          },
        ]}
        data={data}
        isLoading={isFetching}
      />
    </div>
  );
};

export default PayoutTable;
