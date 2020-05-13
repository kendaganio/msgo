import React from "react";
import { Stack, Button, useDisclosure } from "@chakra-ui/core";

import AttendanceTable from "../Attendance/AttendanceTable";
import BulkAttendance from "./BulkAttendance";

const TimesheetPanel = ({ contractor, refetchContractor, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack spacing="4">
      {!isOpen && (
        <Button leftIcon="add" variantColor="blue" onClick={onOpen}>
          Add attendance records
        </Button>
      )}
      {isOpen && (
        <BulkAttendance
          contractorId={contractor.id}
          onSuccess={() => {
            refetchContractor();
            onClose();
          }}
          onCancel={onClose}
        />
      )}
      <AttendanceTable
        data={contractor.attendances}
        showContractor={false}
        showActions={true}
      />
    </Stack>
  );
};

export default TimesheetPanel;
