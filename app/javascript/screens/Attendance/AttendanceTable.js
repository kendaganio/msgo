import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Flex, Text } from "@chakra-ui/core";
import { format, parseJSON } from "date-fns";

import { Table } from "../../components/Table";

const AttendanceTable = ({
  data,
  showContractor = true,
  showActions = true,
  ...props
}) => {
  const defaultColumns = [
    ...(showContractor
      ? [
          {
            header: "Contractor",
            accessor: "contractor.full_name",
          },
        ]
      : []),
    {
      header: "Time in / Time out",
      cell: ({ row }) => {
        const timeIn = parseJSON(row.time_in_at);
        const timeOut = parseJSON(row.time_out_at);
        return (
          <Box>
            <Text color="gray.600" fontSize="sm">
              {format(timeIn, "MMM d / hh:mm a")}
            </Text>
            <Text color="gray.600" fontSize="sm">
              {format(timeOut, "MMM d / hh:mm a")}
            </Text>
          </Box>
        );
      },
    },
    {
      header: "Regular",
      accessor: "regular_hours",
      collapse: true,
    },
    { header: "Overtime", accessor: "overtime_hours", collapse: true },
    ...(showActions
      ? [
          {
            id: "actions",
            collapse: true,
            header: () => null,
            cell: ({ row, data }) => {
              return (
                <Flex justify="flex-end">
                  <Button
                    as={Link}
                    to={`/attendances/${row.id}`}
                    variantColor="orange"
                    variant="link"
                    size="sm"
                    mr="4"
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`/attendances/${row.id}/edit`}
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
        ]
      : []),
  ];

  return <Table columns={defaultColumns} data={data} />;
};

export default AttendanceTable;
