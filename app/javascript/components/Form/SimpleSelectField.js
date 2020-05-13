import React from "react";
import Select from "react-select";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useTheme,
} from "@chakra-ui/core";
import { Field } from "formik";

const SimpleSelectField = ({ label, name, ...props }) => {
  const theme = useTheme();

  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        const isInvalid = meta.error && meta.touched;
        return (
          <FormControl isInvalid={isInvalid}>
            <FormLabel>{label}</FormLabel>
            <Select
              {...props}
              value={props.options.find((o) => o.value === field.value)}
              onChange={(o) => {
                form.setFieldTouched(field.name);
                form.setFieldValue(field.name, o ? o.value : undefined);
              }}
              styles={{
                container: (provided) => ({
                  ...provided,
                  borderColor: "transparent",
                  borderWidth: 0,
                }),
                control: (provided, state) => {
                  return {
                    ...provided,
                    boxShadow: isInvalid
                      ? "0 0 0 1px #e53e3e"
                      : state.isFocused
                      ? "0 0 0 1px #3182ce"
                      : "",
                    borderColor: isInvalid
                      ? theme.colors.red[500]
                      : state.isFocused
                      ? theme.colors.blue[500]
                      : theme.colors.gray[200],
                    ":hover": {
                      borderColor: isInvalid
                        ? theme.colors.red[500]
                        : state.isFocused
                        ? theme.colors.blue[500]
                        : theme.colors.gray[300],
                    },
                  };
                },
                valueContainer: (provided) => ({
                  ...provided,
                  minHeight: "38px",
                }),
              }}
              isLoading={form.isSubmitting}
              isDisabled={form.isSubmitting}
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default SimpleSelectField;
