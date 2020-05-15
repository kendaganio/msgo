import React from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { isAfter } from "date-fns";
import {
  Box,
  Heading,
  Divider,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from "@chakra-ui/core";

import TextField from "../../components/Form/TextField";
import PageCrumbs from "../../components/Pagecrumbs";
import Api from "../../Api";

const New = (props) => {
  const history = useHistory();
  return (
    <div>
      <PageCrumbs />
      <Box p="4" maxW={{ base: "full", md: "4xl" }} mx="auto">
        <Formik
          initialValues={{
            name: "",
            start_date: new Date(),
            end_date: new Date(),
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name your payroll :)"),
            start_date: Yup.date()
              .default(() => new Date())
              .required("start date is required"),
            end_date: Yup.date()
              .default(() => new Date())
              .test(
                "after_time_in",
                "should not be before start date",
                function (value) {
                  return isAfter(value, this.parent.start_date);
                }
              )
              .required("end date is required"),
          })}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);

            Api.post("/api/v1/payrolls", {
              payroll: values,
            })
              .then((res) => {
                actions.setSubmitting(false);
                history.push("/payrolls/" + res.data.id);
              })
              .catch((res) => {
                console.log(res.data);
              });
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                {formikProps.status === "saved" && (
                  <Alert status="success" rounded="md" mb="4" shadow="sm">
                    <AlertIcon />
                    <AlertTitle mr="1">You did it!</AlertTitle>
                    <AlertDescription>
                      A new payroll has been created.
                    </AlertDescription>
                  </Alert>
                )}
                <Box
                  bg="gray.50"
                  p="4"
                  borderWidth="1px"
                  rounded="md"
                  shadow="md"
                >
                  <Heading as="h2" size="lg">
                    New Payroll
                  </Heading>
                  <Text color="gray.500">This is some helpful text</Text>
                  <Divider my="4" />
                  <TextField name="name" label="Name" />
                  <TextField
                    name="start_date"
                    label="Start Date"
                    type="date"
                    mr="2"
                  />
                  <TextField name="end_date" label="End Date" type="date" />
                  <Divider my="4" />
                  <Button
                    variantColor="cyan"
                    type="submit"
                    isLoading={formikProps.isSubmitting}
                    loadingText="Submitting"
                  >
                    Create
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
};

export default New;
