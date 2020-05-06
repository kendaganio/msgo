import React from "react";
import * as Yup from "yup";
import { differenceInHours, isAfter, addMinutes, set } from "date-fns";
import { Box, Button, IconButton, Flex, Text } from "@chakra-ui/core";
import { Formik, Form, FieldArray } from "formik";

import Api from "../../Api";
import TimeRangePicker from "../../components/Form/TimeRangePicker";
import { Tbody, Tr, Td } from "../../components/Table";

const BulkAttendance = ({ contractorId, ...props }) => {
  const schema = Yup.object().shape({
    attendances: Yup.array().of(
      Yup.object().shape({
        time_in_at: Yup.date(),
        time_out_at: Yup.date().test(
          "after_time_in",
          "should not be before Time in",
          function (value) {
            return isAfter(value, this.parent.time_in_at);
          }
        ),
      })
    ),
  });

  return (
    <Box p="4" bg="gray.50" rounded="lg">
      <Formik
        initialValues={{
          attendances: [
            {
              time_in_at: set(new Date(), { hours: 7, minutes: 0, seconds: 0 }),
              time_out_at: set(new Date(), {
                hours: 16,
                minutes: 0,
              }),
            },
          ],
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);

          Api.post(`/api/v1/contractors/${contractorId}/attendances`, values)
            .then((res) => {
              actions.setSubmitting(false);
              actions.setStatus("saved");
            })
            .catch((res) => {
              console.log(res.data);
            });
        }}
      >
        {(formikProps) => {
          const { attendances } = formikProps.values;
          return (
            <Form>
              <FieldArray name="attendances">
                {(arrayHelpers) => {
                  return (
                    <>
                      <Flex justify="flex-end">
                        <Button
                          leftIcon="add"
                          variantColor="blue"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            arrayHelpers.push({
                              time_in_at: set(new Date(), {
                                hours: 7,
                                minutes: 0,
                              }),
                              time_out_at: set(new Date(), {
                                hours: 16,
                                minutes: 0,
                                seconds: 30,
                              }),
                            })
                          }
                        >
                          Add
                        </Button>
                      </Flex>
                      <Box as="table">
                        <Tbody>
                          {attendances.map((attendance, index) => (
                            <Tr key={`att-${index}`}>
                              <Td>
                                <TimeRangePicker
                                  startName={`attendances.${index}.time_in_at`}
                                  endName={`attendances.${index}.time_out_at`}
                                />
                              </Td>
                              <Td>
                                <Text>
                                  {differenceInHours(
                                    addMinutes(attendance.time_out_at, -1),
                                    addMinutes(attendance.time_in_at, 2)
                                  )}
                                </Text>
                              </Td>
                              <Td>
                                <IconButton
                                  ml="2"
                                  icon="delete"
                                  variantColor="pink"
                                  size="sm"
                                  onClick={() => arrayHelpers.remove(index)}
                                />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Box>
                    </>
                  );
                }}
              </FieldArray>
              <Button type="submit">submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default BulkAttendance;
