import React from "react";
import { Select } from "@chakra-ui/react";
const FormSelect = () => {
  return (
    <Select
      border="none"
      placeholder="Filter"
      iconColor="rgba(124, 93, 250, 1)"
      color="darkThemeWhite"
      fontWeight="700"
      fontSize="0.75rem"
      lineHeight="0.9rem"
    >
      <option className={classes["option"]} value="Draft">
        Draft
      </option>
      <option className={classes["option"]} value="Pending">
        Pending
      </option>
      <option className={classes["option"]} value="Paid">
        Paid
      </option>
    </Select>
  );
};

export default FormSelect;
