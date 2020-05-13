import React from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "@chakra-ui/core";

import { Table } from "../../components/Table";

const FinalTable = ({ data, ...props }) => {
  return (
    <div>
      <Table
        columns={[
          {
            header: "Contractor",
            accessor: "pay_to",
          },
          {
            header: "Payslip",
            cell: ({ row }) => (
              <Button
                as={Link}
                target="_blank"
                to={`/payslips/${row.id}`}
                rightIcon="external-link"
                variantColor="orange"
                variant="link"
                size="sm"
              >
                View
              </Button>
            ),
          },
          {
            collapse: true,
            header: "Gross Pay",
            cell: ({ row }) => <Text color="green.600">{row.gross_pay}</Text>,
          },
          {
            collapse: true,
            header: "Net Deductions",
            cell: ({ row }) => (
              <Text color="red.600">{row.net_deductions}</Text>
            ),
          },
          {
            collapse: true,
            header: "Net Pay",
            cell: ({ row }) => <Text color="red.600">{row.net_pay}</Text>,
          },
        ]}
        data={data}
      />
    </div>
  );
};

export default FinalTable;
