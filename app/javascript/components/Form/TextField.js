import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/core";
import { Field } from "formik";

const TextField = ({ label, name, type = "text", ...props }) => {
  return (
    <Field name={name} {...props}>
      {({ field, form, meta }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input {...field} type={type} id={field.name} />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default TextField;
