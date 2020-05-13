import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import { Badge, Box, Button } from "@chakra-ui/core";

import Api from "../../Api";
import DraftTable from "./DraftTable";
import FinalTable from "./FinalTable";
import PageHeader from "../../components/PageHeader";
import { fetchOne } from "../../Api";

const Show = (props) => {
  const { id } = useParams();
  const { status, data, error } = useQuery(["payrolls", id], fetchOne);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  const payroll = data.data;
  const finalizePayroll = () => {
    Api.post(`/api/v1/payrolls/${payroll.id}/finalize`)
      .then((res) => console.log(res.data))
      .catch((res) => console.log(res.data));
  };

  return (
    <div>
      <PageHeader
        title={payroll.name}
        actions={
          payroll.status === "draft" ? (
            <Button
              variantColor="green"
              leftIcon="check"
              onClick={finalizePayroll}
            >
              Finalize Payroll
            </Button>
          ) : (
            <Button variantColor="green" leftIcon="download">
              Download CSV
            </Button>
          )
        }
      >
        <Badge
          mr="2"
          variantColor={payroll.status === "final" ? "green" : "orange"}
        >
          {payroll.status}
        </Badge>
        {format(parseISO(payroll.start_date), "MMMM d")} -{" "}
        {format(parseISO(payroll.end_date), "MMMM d, yyyy")}
      </PageHeader>
      <Box p="4">
        {payroll.status === "draft" ? (
          <DraftTable data={payroll.payees} />
        ) : (
          <FinalTable data={payroll.payees} />
        )}
      </Box>
    </div>
  );
};

export default Show;
