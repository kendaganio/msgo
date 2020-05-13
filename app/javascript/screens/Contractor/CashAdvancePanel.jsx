import React from "react";
import * as Yup from "yup";
import {
  Stack,
  Textarea,
  Heading,
  Button,
  Box,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/core";

import Api from "../../Api";
import StatCard from "../../components/StatCard";
import FormModal from "../../components/Form/Modal";
import TextField from "../../components/Form/TextField";
import PayoutTable from "../../screens/Payout/Table";

const CashAdvancePanel = ({ contractor, refetchContractor, ...props }) => {
  const defaultValues = {
    paid_at: "",
    amount: "",
    notes: "",
    contractor_id: contractor.id,
    cash_advance: true,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalCA = contractor.payouts
    .reduce(
      (total, p) =>
        total +
        (p.cash_advance ? parseFloat(p.amount, 10) : -parseFloat(p.amount, 10)),
      0.0
    )
    .toFixed(2);

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="4" mb="4">
        <StatCard heading="Total CA">PHP {totalCA}</StatCard>
        <StatCard heading="CA PAyments">PHP 0.00</StatCard>
      </SimpleGrid>
      <PayoutTable data={contractor.payouts} showContractor={false} />
      <Button onClick={onOpen} variantColor="blue" leftIcon="add">
        Add CA
      </Button>

      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        heading={`Add Cash Advance for ${contractor.first_name}`}
        initialValues={defaultValues}
        validationSchema={Yup.object().shape({
          amount: Yup.number().required("amount is required"),
          paid_at: Yup.date().required("paid at is required"),
          notes: Yup.string(),
        })}
        onSubmit={(values, actions) => {
          Api.post("/api/v1/payouts", { payout: values })
            .then((res) => {
              actions.setSubmitting(false);
              refetchContractor();
              onClose();
              console.log(res.data);
            })
            .catch((error) => console.log(error.data));
        }}
      >
        <Stack spacing="2">
          <TextField label="Amount" name="amount" />
          <TextField label="Paid At" name="paid_at" type="date" />
          <TextField label="Notes" name="notes" as={Textarea} />
        </Stack>
      </FormModal>
    </>
  );
};

export default CashAdvancePanel;
