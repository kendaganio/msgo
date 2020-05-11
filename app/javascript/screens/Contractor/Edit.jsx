import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/core";

import PageCrumbs from "../../components/Pagecrumbs";
import Form from "./Form";
import Api, { fetchOne } from "../../Api";

const Edit = (props) => {
  const { id } = useParams();
  const { status, data, error } = useQuery(["contractors", id], fetchOne);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  const contractor = data.data;
  return (
    <div>
      <PageCrumbs />
      <Box p="4" maxW={{ base: "full", md: "4xl" }} mx="auto">
        <Form
          initialValues={{
            ...contractor,
            daily_rate: contractor.hourly_rate * 8,
          }}
          onSubmit={(values, actions) => {
            Api.put(`/api/v1/contractors/${id}`, {
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
                console.log(res.data);
              });
          }}
        />
      </Box>
    </div>
  );
};

export default Edit;
