import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import { Box, SimpleGrid } from "@chakra-ui/core";

import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import AttendanceTable from "../../screens/Attendance/AttendanceTable";
import { fetchOne } from "../../Api";

const Show = (props) => {
  const { id } = useParams();
  const { status, data, error } = useQuery(["payslips", id], fetchOne);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  const {
    metadata: { attendances },
    payroll,
    ...payslip
  } = data.data;

  return (
    <div>
      <PageHeader title={`Payslip #${payslip.id}: ${payslip.pay_to}`}>
        {payroll.start_date} - {payroll.end_date}
      </PageHeader>

      <Box p="4">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing="2" mb="4">
          <StatCard heading="Hours">
            {payslip.regular_hours} / {payslip.overtime_hours}
          </StatCard>
          <StatCard heading="Gross Pay" color="green.600">
            PHP {payslip.gross_pay}
          </StatCard>
          <StatCard heading="Deductions" color="red.600">
            PHP {payslip.net_deductions}
          </StatCard>
          <StatCard heading="Net Pay">PHP {payslip.net_pay}</StatCard>
        </SimpleGrid>
        <AttendanceTable
          showContractor={false}
          showActions={false}
          data={attendances}
        />
      </Box>
    </div>
  );
};

export default Show;
