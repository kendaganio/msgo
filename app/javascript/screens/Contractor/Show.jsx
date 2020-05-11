import React from "react";
import { Link, useParams } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { useQuery } from "react-query";

import AttendanceTable from "../Attendance/AttendanceTable";
import PageCrumbs from "../../components/Pagecrumbs";
import { fetchOne } from "../../Api";
import {
  Flex,
  SimpleGrid,
  Heading,
  Avatar,
  Stack,
  Text,
  Box,
  Button,
} from "@chakra-ui/core";
import BulkAttendance from "./BulkAttendance";

const Show = (props) => {
  const { id } = useParams();
  const { status, data, error } = useQuery(["contractors", id], fetchOne);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  const contractor = data.data;

  return (
    <div>
      <PageCrumbs />
      <Flex
        bg="gray.50"
        rounded="md"
        align="center"
        borderWidth="1px"
        spacing="4"
        shadow="sm"
        p="8"
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", md: "flex-start" }}
      >
        <Avatar
          size="2xl"
          mr={{ base: 0, md: 10 }}
          mb={{ base: 4, md: 0 }}
          src={contractor.image_url}
        />
        <Stack
          spacing="0"
          flexGrow="1"
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading as="h3" color="gray.700">
            {contractor.full_name}
          </Heading>
          <Heading as="h3" size="md" color="gray.700" fontWeight="normal">
            {contractor.job_title || "???"}
          </Heading>
          <Text color="gray.500" fontSize="sm" mt="1">
            Employee No: {contractor.employee_number}
            <br />
            Start Date:{" "}
            {contractor.hire_date &&
              format(parseISO(contractor.hire_date), "MMMM d, yyyy")}
          </Text>
        </Stack>
        <Stack
          spacing={{ base: 2, md: 4 }}
          mt={{ base: 4, md: 0 }}
          minW={{ base: "full", md: "auto" }}
        >
          <Button
            as={Link}
            to={`/contractors/${contractor.id}/edit`}
            variantColor="blue"
            leftIcon="edit"
          >
            Edit Contractor
          </Button>
          <Button>Another Action</Button>
        </Stack>
      </Flex>
      <BulkAttendance contractorId={id} />
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing="4" p="4">
        <AttendanceTable
          data={contractor.attendances}
          showContractor={false}
          showActions={true}
        />
      </SimpleGrid>
    </div>
  );
};

export default Show;
