import React from "react";
import { Select } from "@chakra-ui/react";
const FormSelect = ({ objKey }) => {
  return (
    <Select
      bg="darkThemeInput"
      border="none"
      selected="Net 30 Days"
      iconColor="darkThemeGrey"
      color="darkThemeWhite"
      fontWeight="700"
      fontSize="0.75rem"
      lineHeight="0.9rem"
    >
      <option value="Net 30 Days">Net 30 Days</option>
      <option value="Net 60 Days">Net 60 Days</option>
      <option value="Net 90 Days">Net 90 Days</option>
    </Select>
  );
};

export default FormSelect;
