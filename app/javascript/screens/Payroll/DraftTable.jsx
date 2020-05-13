import React from "react";
import { Text } from "@chakra-ui/core";

import { Table } from "../../components/Table";

const DraftTable = ({ data, ...props }) => {
  return (
    <Table
      columns={[
        {
          header: "Contractor",
          cell: ({ row }) => `${row.first_name} ${row.last_name}`,
        },
        {
          collapse: true,
          header: "Days Worked",
          accessor: "days_worked",
        },
        {
          collapse: true,
          header: "Hourly Rate",
          accessor: "hourly_rate",
        },
        {
          collapse: true,
          header: "Hours",
          cell: ({ row }) => (
            <Text>
              {row.regular_hours} / {row.overtime_hours}
            </Text>
          ),
        },
        {
          collapse: true,
          header: "Pay (REG)",
          cell: ({ row }) => row.regular_hours * row.hourly_rate,
        },
        {
          collapse: true,
          header: "Pay (OT)",
          cell: ({ row }) => row.overtime_hours * (row.hourly_rate * 1.25),
        },
        {
          collapse: true,
          header: "Gross Pay",
          cell: ({ row }) => (
            <Text color="green.600">
              {row.regular_hours * row.hourly_rate +
                row.overtime_hours * (row.hourly_rate * 1.25)}
            </Text>
          ),
        },
        {
          collapse: true,
          header: "Cash Advance",
          cell: ({ row }) => <Text color="red.600">{row.total_ca}</Text>,
        },
        {
          collapse: true,
          header: "Net Pay",
          cell: ({ row }) => (
            <Text color="red.600">
              {row.regular_hours * row.hourly_rate +
                row.overtime_hours * row.hourly_rate * 1.25 -
                row.total_ca}
            </Text>
          ),
        },
      ]}
      data={data}
    />
  );
};

export default DraftTable;
