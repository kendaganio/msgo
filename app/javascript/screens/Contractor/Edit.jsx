import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import AttendanceTable from "../Attendance/AttendanceTable";
import PageCrumbs from "../../components/Pagecrumbs";
import { fetchContractor, fetchAttendances } from "../../Api";
import { Flex, Grid, Heading, Avatar, Stack, Text, Box } from "@chakra-ui/core";

const Edit = (props) => {
  const { id } = useParams();
  const { status, data, error } = useQuery(
    ["contractor", id],
    fetchContractor(id)
  );

  console.log("id", id);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  const contractor = data.data;

  return (
    <div>
      <PageCrumbs />
      <Grid templateColumns={{ base: "1fr", md: "300px 3fr" }} p="4" gap="4">
        <Stack
          bg="gray.50"
          rounded="md"
          align="center"
          borderWidth="1px"
          spacing="4"
          shadow="sm"
          p="8"
        >
          <Avatar size="2xl" src={contractor.image_url} />
          <Box textAlign="center">
            <Heading as="h3" size="md">
              {contractor.full_name}
            </Heading>
            <Heading as="h3" size="md" color="gray.500">
              Sandblaster
            </Heading>
            <Text color="gray.400" fontSize="sm" mt="2">
              Employee No: 123123212131
              <br />
              Employee Since: 05/22/2020
            </Text>
          </Box>
        </Stack>
        <AttendanceTable
          data={contractor.attendances}
          showContractor={false}
          showActions={false}
        />
      </Grid>
    </div>
  );
};

export default Edit;
