import React from "react";
import { Formik, Form } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/core";

const FormModal = ({
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit = (values) => console.log(values),
  heading,
  submitText = "Save",
  isCancelable = true,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        return (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <Form>
              <ModalOverlay />
              <ModalContent rounded="lg">
                <ModalHeader bg="gray.100" color="gray.700" roundedTop="lg">
                  {heading}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    variantColor="blue"
                    mr={3}
                    isLoading={formikProps.isSubmitting}
                    loadingText="Submitting"
                  >
                    {submitText}
                  </Button>
                  {isCancelable && (
                    <Button
                      variant="ghost"
                      onClick={onClose}
                      isDisabled={formikProps.isSubmitting}
                    >
                      Cancel
                    </Button>
                  )}
                </ModalFooter>
              </ModalContent>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default FormModal;
