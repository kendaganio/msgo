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
            Header: "Contractor",
            accessor: "contractor.full_name",
          },
        ]
      : []),
    {
      Header: "Time in / Time out",
      Cell: ({ row }) => {
        const timeIn = parseJSON(row.original.time_in_at);
        const timeOut = parseJSON(row.original.time_out_at);
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
      Header: "Regular",
      accessor: "regular_hours",
      collapse: true,
    },
    { Header: "Overtime", accessor: "overtime_hours", collapse: true },
    ...(showActions
      ? [
          {
            id: "actions",
            collapse: true,
            Header: () => null,
            Cell: ({ row, data }) => {
              return (
                <Flex justify="flex-end">
                  <Button
                    as={Link}
                    to={`/attendances/${row.original.id}`}
                    variantColor="orange"
                    variant="link"
                    size="sm"
                    mr="4"
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`/attendances/${row.original.id}/edit`}
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
