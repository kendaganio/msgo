import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, Box } from "@chakra-ui/core";

import PageHeader from "../../components/PageHeader";
import AttendanceTable from "./AttendanceTable";
import { fetchAttendances } from "../../Api";

const List = (props) => {
  const { status, data, error } = useQuery("attendances", fetchAttendances());

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <PageHeader
        title="Attendance"
        actions={
          <Button
            as={Link}
            leftIcon="add"
            variantColor="blue"
            variant="outline"
            size="sm"
            to={`/attendances/new`}
          >
            Create new
          </Button>
        }
      />

      <Box p="4">
        <AttendanceTable data={data.data} />
      </Box>
    </div>
  );
};

export default List;
