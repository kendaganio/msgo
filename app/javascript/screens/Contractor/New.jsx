import React from "react";
import { Box } from "@chakra-ui/core";

import Api from "../../Api";
import Form from "./Form";
import PageCrumbs from "../../components/Pagecrumbs";

const New = (props) => {
  return (
    <div>
      <PageCrumbs />
      <Box p="4" maxW={{ base: "full", md: "4xl" }} mx="auto">
        <Form
          onSubmit={(values, actions) => {
            Api.post("/api/v1/contractors", {
              contractor: {
                ...values,
                hourly_rate: values.daily_rate / 8,
              },
            })
              .then((res) => {
                actions.setSubmitting(false);
                actions.setStatus({ redirect: `/contractors/${res.data.id}` });
              })
              .catch((res) => {
                actions.setSubmitting(false);
                actions.setErrors({ ...res.response.data.errors });
              });
          }}
        />
      </Box>
    </div>
  );
};

export default New;
