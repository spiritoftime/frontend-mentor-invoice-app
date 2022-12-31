import React from "react";
import { Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import classes from "../Invoices Page/invoicetab.module.css";
const FormSelect = ({ objKey }) => {
  const { register } = useFormContext();
  const theme = useSelector((state) => state.theme.isLight);
  return (
    <Select
      {...register("paymentTerms")}
      selected="Net 30 Days"
      iconColor="darkThemeGrey"
      color={!theme ? "darkThemeWhite" : "#0C0E16"}
      bg={!theme ? "darkThemeInput" : "#F9FAFE"}
      fontWeight="700"
      lineHeight="1.25"
      letterSpacing="-0.25px"
      fontSize="0.75rem"
      border={!theme ? "none" : "1px solid rgba(223, 227, 250, 1)"}
    >
      <option
        className={!theme ? classes["option"] : classes["light-option"]}
        value="Net 30 Days"
      >
        Net 30 Days
      </option>
      <option
        className={!theme ? classes["option"] : classes["light-option"]}
        value="Net 60 Days"
      >
        Net 60 Days
      </option>
      <option
        className={!theme ? classes["option"] : classes["light-option"]}
        value="Net 90 Days"
      >
        Net 90 Days
      </option>
    </Select>
  );
};

export default FormSelect;
