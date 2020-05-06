import React from "react";
import * as Yup from "yup";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/core";

import PageCrumbs from "../../components/Pagecrumbs";
import Form from "./Form";
import Api, { fetchContractors } from "../../Api";

const New = (props) => {
  return (
    <div>
      <PageCrumbs />
      <Box p="4" maxW={{ base: "full", md: "4xl" }} mx="auto">
        <Form
          onSubmit={(values, actions) => {
            Api.post("/api/v1/attendances", {
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
        />
      </Box>
    </div>
  );
};

export default New;
