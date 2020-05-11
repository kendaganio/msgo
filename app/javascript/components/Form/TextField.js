import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/core";
import { Field } from "formik";

const TextField = ({ label, name, type = "text", helpText, ...props }) => {
  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input {...field} type={type} id={field.name} {...props} />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
          {helpText && (
            <Text fontSize="xs" color="gray.500">
              {helpText}
            </Text>
          )}
        </FormControl>
      )}
    </Field>
  );
};

export default TextField;
