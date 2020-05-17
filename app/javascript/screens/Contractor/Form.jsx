import React from "react";
import * as Yup from "yup";
import omitBy from "lodash-es/omitBy";
import { Redirect, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/core";

import SimpleSelectField from "../../components/Form/SimpleSelectField";
import TextField from "../../components/Form/TextField";

const defaultValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  contact_number: "",
  employee_number: "",
  job_title: "",
  birthday: undefined,
  address: "",
  hire_date: undefined,
  daily_rate: "",
  hourly_rate: "",
  sss: "",
  tin: "",
  philhealth: "",
  pagibig: "",
  emergency_contact: "",
  emergency_contact_number: "",
  emergency_contact_relation: "",
  status: "active",
};

const ContractorForm = ({
  heading = "New Contractor",
  initialValues,
  onSubmit = (values, actions) => console.log(values),
}) => {
  const toast = useToast();
  const statusOptions = ["active", "inactive", "awol"].map((v) => ({
    label: v,
    value: v,
  }));

  return (
    <Formik
      initialValues={{ ...defaultValues, ...omitBy(initialValues, (v) => !v) }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().required("first name is required"),
        middle_name: Yup.string(),
        last_name: Yup.string().required("last name is required"),
        contact_number: Yup.string(),
        birthday: Yup.date(),
        employee_number: Yup.string(),
        address: Yup.string(),

        hire_date: Yup.date(),
        status: Yup.string(),
        job_title: Yup.string(),
        hourly_rate: Yup.number(),
        daily_rate: Yup.number().required("daily rate is required"),

        sss: Yup.string(),
        tin: Yup.string(),
        philhealth: Yup.string(),
        pagibig: Yup.string(),

        emergency_contact: Yup.string(),
        emergency_contact_relation: Yup.string(),
        emergency_contact_number: Yup.string(),
      })}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        if (formikProps.status && formikProps.status.redirect) {
          return <Redirect to={formikProps.status.redirect} />;
        }
        return (
          <Form>
            {formikProps.status === "saved" && <Redirect to="/contractors" />}
            <Box bg="gray.50" p="4" borderWidth="1px" rounded="md" shadow="md">
              <Heading as="h3" size="lg" mb="5">
                Personal Information
              </Heading>
              <Stack spacing="2">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing="2">
                  <TextField
                    label="First Name"
                    name="first_name"
                    placeholder="Mateo Severin"
                  />
                  <TextField
                    label="Middle Name"
                    name="middle_name"
                    placeholder="Estrella"
                  />
                  <TextField
                    label="Last Name"
                    name="last_name"
                    placeholder="Gonzales"
                  />
                  <TextField label="Contact No." name="contact_number" />
                  <TextField label="Birthday" name="birthday" type="date" />
                </SimpleGrid>
                <TextField
                  label="Address"
                  name="address"
                  as={Textarea}
                  rows="4"
                />
              </Stack>
              <Divider my="4" />
              <Heading as="h3" size="lg" mb="5">
                Employment Details
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="2">
                <TextField
                  label="Employee Number"
                  name="employee_number"
                  helpText="this field will be auto generated on save"
                  readOnly
                />
                <TextField label="Job Title" name="job_title" />
                <TextField label="Start Date" type="date" name="hire_date" />
                <SimpleSelectField
                  name="status"
                  label="Employment Status"
                  options={statusOptions}
                  isClearable
                  isSearchable
                />
                <TextField label="Daily Rate" type="number" name="daily_rate" />
                <TextField
                  label="Hourly Rate"
                  type="number"
                  name="hourly_rate"
                  value={formikProps.values.daily_rate / 8}
                  readOnly
                />
              </SimpleGrid>
              <Divider my="4" />
              <Heading as="h3" size="lg" mb="5">
                Goverment Stuvves
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="2">
                <TextField label="SSS" name="sss" />
                <TextField label="TIN" name="tin" />
                <TextField label="Philhealth" name="philhealth" />
                <TextField label="Pagibig" name="pagibig" />
              </SimpleGrid>
              <Divider my="4" />
              <Heading as="h3" size="lg" mb="5">
                Emergency Contact
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="2">
                <TextField label="Contact Person" name="emergency_contact" />
                <TextField
                  label="Relation to Contractor"
                  name="emergency_contact_relation"
                />
                <TextField
                  label="Contact No."
                  name="emergency_contact_number"
                />
              </SimpleGrid>
              <Divider my="4" />
              <Button
                variantColor="cyan"
                type="submit"
                isLoading={formikProps.isSubmitting}
                loadingText="Submitting"
              >
                Save
              </Button>
              <Button
                as={Link}
                to="/contractors"
                ml="2"
                variantColor="cyan"
                variant="link"
              >
                Cancel
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContractorForm;
