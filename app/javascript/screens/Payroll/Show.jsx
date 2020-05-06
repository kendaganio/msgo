import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import PageHeader from "../../components/PageHeader";
import { Table } from "../../components/Table";
import { fetchOne } from "../../Api";
import { Box, Text } from "@chakra-ui/core";

const Show = (props) => {
  const { id } = useParams();
  const { status, data, error } = useQuery(["payrolls", id], fetchOne);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  const payroll = data.data;
  console.log(payroll.payees);

  return (
    <div>
      <PageHeader title={payroll.name} />
      <Box p="4">
        <Table
          columns={[
            {
              Header: "Contractor",
              Cell: ({ row }) =>
                `${row.original.first_name} ${row.original.last_name}`,
            },
            {
              collapse: true,
              Header: "Days Worked",
              accessor: "days_worked",
            },
            {
              collapse: true,
              Header: "Hours",
              Cell: ({ row }) => (
                <Text>
                  {row.original.regular_hours} / {row.original.overtime_hours}
                </Text>
              ),
            },
            {
              collapse: true,
              Header: "Pay (REG)",
              Cell: ({ row }) =>
                row.original.regular_hours * row.original.hourly_rate,
            },
            {
              collapse: true,
              Header: "Pay (OT)",
              Cell: ({ row }) =>
                row.original.overtime_hours * (row.original.hourly_rate * 1.25),
            },
            {
              collapse: true,
              Header: "Holiday",
              Cell: ({ row }) => "??",
            },
            {
              collapse: true,
              Header: "GROSS Pay",
              Cell: ({ row }) => (
                <Text color="green.600">
                  {row.original.regular_hours * row.original.hourly_rate +
                    row.original.overtime_hours *
                      (row.original.hourly_rate * 1.25)}
                </Text>
              ),
            },
            {
              collapse: true,
              Header: "Cash Advance",
              Cell: ({ row }) => <Text color="red.600">TEKA</Text>,
            },
            {
              collapse: true,
              Header: "Net Pay",
              Cell: ({ row }) => <Text color="red.600">WALA PA</Text>,
            },
          ]}
          data={Object.values(payroll.payees)}
        />
      </Box>
    </div>
  );
};

export default Show;
