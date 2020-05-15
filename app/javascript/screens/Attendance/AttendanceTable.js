import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Flex, Text } from "@chakra-ui/core";
import { format, parseISO } from "date-fns";

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
      header: "Date",
      cell: ({ row }) => (
        <>
          <Text>{format(parseISO(row.time_in_at), "MMMM d, yyyy")}</Text>
          <Text color="gray.600" fontSize="sm">
            {format(parseISO(row.time_in_at), "iiii")}
          </Text>
        </>
      ),
    },
    {
      header: "Time in / Time out",
      cell: ({ row }) => {
        const timeIn = parseISO(row.time_in_at);
        const timeOut = parseISO(row.time_out_at);
        return (
          <Box>
            <Text color="gray.600" fontSize="sm">
              {format(timeIn, "hh:mm a")} - {format(timeOut, "hh:mm a")}
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
                  {false && (
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
                  )}
                  {!row.payslip_id && (
                    <Button
                      as={Link}
                      to={`/attendances/${row.id}/edit`}
                      variantColor="blue"
                      variant="link"
                      size="sm"
                    >
                      Edit
                    </Button>
                  )}
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
