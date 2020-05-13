import React from "react";
import { set } from "date-fns";
import * as Yup from "yup";
import { useQuery } from "react-query";
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
} from "@chakra-ui/core";

import SimpleSelectField from "../../components/Form/SimpleSelectField";
import TimeRangePicker from "../../components/Form/TimeRangePicker";
import { fetchContractors } from "../../Api";

const AttendanceForm = ({
  initialValues = {
    contractor_id: undefined,
    time_in_at: set(new Date(), {
      hours: 7,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    time_out_at: set(new Date(), {
      hours: 16,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
  },
  onSubmit = (values, actions) => console.log(values),
  heading = "New Attendance Record",
  ...props
}) => {
  const { status: contractorQueryStatus, data: contractors, error } = useQuery(
    "contractors",
    fetchContractors
  );

  if (contractorQueryStatus === "loading") {
    return "loading";
  }

  const contractorOptions = contractors.data.map((c) => ({
    label: c.full_name,
    value: c.id,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        contractor_id: Yup.number().required("contractor is required"),
        time_in_at: Yup.date().default(() => new Date()),
        time_out_at: Yup.date()
          .default(() => new Date())
          .test("after_time_in", "should not be before Time in", function (
            value
          ) {
            return isAfter(value, this.parent.time_in_at);
          }),
      })}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        return (
          <Form>
            {formikProps.status === "saved" && (
              <Alert status="success" rounded="md" mb="4" shadow="sm">
                <AlertIcon />
                <AlertTitle mr="1">You did it!</AlertTitle>
                <AlertDescription>
                  A new attendance record has been created.
                </AlertDescription>
              </Alert>
            )}
            <Box bg="gray.50" p="4" borderWidth="1px" rounded="md" shadow="md">
              <Heading as="h2" size="lg">
                {heading}
              </Heading>
              <Text color="gray.500">This is some helpful text</Text>
              <Divider my="4" />
              <SimpleSelectField
                name="contractor_id"
                label="Contractor"
                options={contractorOptions}
                isLoading={contractorQueryStatus === "loading"}
                isClearable
                isSearchable
              />
              <TimeRangePicker
                startName="time_in_at"
                startLabel="Time in"
                endName="time_out_at"
                endLabel="Time out"
                mt="2"
              />
              <Divider my="4" />
              <Button
                variantColor="cyan"
                type="submit"
                isLoading={formikProps.isSubmitting}
                loadingText="Submitting"
              >
                Save
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AttendanceForm;
