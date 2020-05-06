import React from "react";
import * as Yup from "yup";
import { parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/core";

import PageCrumbs from "../../components/Pagecrumbs";
import Form from "./Form";
import Api, { fetchOne } from "../../Api";

const Edit = (props) => {
  const { id } = useParams();

  const { status, data, error } = useQuery(["attendances", id], fetchOne);

  if (status === "loading") {
    return "loading";
  }

  const attendance = data.data;

  return (
    <div>
      <PageCrumbs />
      <Box p="4" maxW={{ base: "full", md: "4xl" }} mx="auto">
        <Form
          heading={`Editing Attendance #${attendance.id}`}
          onSubmit={(values, actions) => {
            Api.put(`/api/v1/attendances/${attendance.id}`, {
              attendance: values,
            })
              .then((res) => {
                actions.setSubmitting(false);
                actions.setStatus("saved");
              })
              .catch((res) => {
                console.log(res.data);
              });
          }}
          initialValues={{
            contractor_id: attendance.contractor_id,
            time_in_at: parseISO(attendance.time_in_at),
            time_out_at: parseISO(attendance.time_out_at),
          }}
        />
      </Box>
    </div>
  );
};

export default Edit;
