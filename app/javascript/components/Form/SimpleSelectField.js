import React from "react";
import Select from "react-select";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/core";
import { Field } from "formik";

const SimpleSelectField = ({ label, name, ...props }) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        return (
          <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
            <Select
              {...props}
              value={props.options.find((o) => o.value === field.value)}
              onChange={(o) => {
                form.setFieldTouched(field.name);
                form.setFieldValue(field.name, o ? o.value : undefined);
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
