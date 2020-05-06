import React from "react";
import { SimpleGrid } from "@chakra-ui/core";
import DateTimePicker from "./DateTimePicker";

const TimeRangePicker = ({
  startName,
  startLabel,
  endName,
  endLabel,
  ...props
}) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="2" {...props}>
      <DateTimePicker
        name={startName}
        label={startLabel}
        endName={endName}
        runSecretFunctionToUpdateEndDate
      />
      <DateTimePicker name={endName} label={endLabel} />
    </SimpleGrid>
  );
};

export default TimeRangePicker;
