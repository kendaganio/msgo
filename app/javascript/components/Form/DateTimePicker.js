import React, { useState } from "react";
import { addHours, subHours, lightFormat, formatISO, set } from "date-fns";
import get from "lodash-es/get";
import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/core";

const DateTimePicker = ({
  name,
  label,
  endName = undefined,
  runSecretFunctionToUpdateEndDate = false,
  ...props
}) => {
  const getDatePart = (date) => lightFormat(date, "yyyy-MM-dd");
  const getTimePart = (date) => lightFormat(date, "HH:mm");

  const setDatePart = (value, ydmString) => {
    const [year, month, date] = ydmString
      .split("-")
      .map((token) => parseInt(token, 10));
    return set(value, { year, month: month - 1, date });
  };

  const setTimePart = (value, timeString) => {
    const [hours, minutes] = timeString.split(":");
    return set(value, { hours, minutes, seconds: 0, milliseconds: 0 });
  };

  return (
    <Field name={name}>
      {({ field, meta, form }) => {
        return (
          <FormControl isInvalid={meta.error && meta.touched}>
            {label && <FormLabel>{label}</FormLabel>}
            <Flex>
              <Input
                type="date"
                value={getDatePart(field.value)}
                mr="1"
                onChange={(e) => {
                  if (e.target.value) {
                    form.setFieldTouched(field.name);
                    form.setFieldValue(
                      field.name,
                      setDatePart(field.value, e.target.value)
                    );

                    if (runSecretFunctionToUpdateEndDate && endName) {
                      const endValue = get(form.values, endName);
                      form.setFieldValue(
                        endName,
                        setDatePart(endValue, e.target.value)
                      );
                    }
                  }
                }}
                isDisabled={form.isSubmitting}
              />
              <InputGroup>
                <InputLeftElement>
                  <IconButton
                    size="xs"
                    icon="minus"
                    onClick={() => {
                      const newTime = getTimePart(subHours(field.value, 1));
                      form.setFieldValue(
                        field.name,
                        setTimePart(field.value, newTime)
                      );
                    }}
                  />
                </InputLeftElement>
                <Input
                  type="time"
                  value={getTimePart(field.value)}
                  onChange={(e) => {
                    form.setFieldTouched(field.name);
                    form.setFieldValue(
                      field.name,
                      setTimePart(field.value, e.target.value)
                    );
                  }}
                  isDisabled={form.isSubmitting}
                />
                <InputRightElement>
                  <IconButton
                    size="xs"
                    icon="add"
                    onClick={() => {
                      const newTime = getTimePart(addHours(field.value, 1));
                      form.setFieldTouched(field.name);
                      form.setFieldValue(
                        field.name,
                        setTimePart(field.value, newTime)
                      );
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </Flex>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default DateTimePicker;
