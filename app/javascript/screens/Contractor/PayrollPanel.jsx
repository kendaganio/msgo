import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "@chakra-ui/core";

import { Table } from "../../components/Table";

const PayrollPanel = ({ data, ...props }) => {
  console.log(data);
  return (
    <div>
      <Table
        columns={[
          { header: "Date", cell: ({ row }) => "???" },
          { header: "Net Pay", accessor: "net_pay" },
          {
            header: "Status",
            cell: ({ row }) => (
              <Badge
                mr="2"
                variantColor={row.status === "new" ? "gray" : "green"}
              >
                {row.status}
              </Badge>
            ),
          },
          {
            id: "link",
            header: "",
            cell: ({ row }) => (
              <Button
                as={Link}
                to={`/payslips/${row.id}`}
                target="_blank"
                variant="link"
                variantColor="orange"
                rightIcon="external-link"
                size="sm"
              >
                View
              </Button>
            ),
          },
        ]}
        data={data}
      />
    </div>
  );
};

export default PayrollPanel;
