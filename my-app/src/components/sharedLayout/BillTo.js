import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Box, Text, Grid, GridItem, FormLabel } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const BillTo = () => {
  const theme = useSelector((state) => state.theme.isLight);
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={6}>
      <Text
        fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
        lineHeight="1.4"
        fontWeight="500"
        color="rgba(124, 93, 250, 1)"
      >
        Bill To
      </Text>
      <Grid rowGap={6} columnGap={6} templateColumns="repeat(2,1fr)">
        <GridItem colSpan={2}>
          <FormInput
            objKey="clientName"
            color="darkThemeWhite"
            label="Client's Name"
            type="text"
            validationObj={{
              required: "Required",
            }}
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="clientEmail"
            color="darkThemeWhite"
            label="Client's Email"
            type="text"
            validationObj={{
              required: "Required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            }}
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="billToAddress"
            color="darkThemeWhite"
            label="Street Address"
            type="text"
            validationObj={{
              required: "Required",
            }}
          ></FormInput>
        </GridItem>
        <GridItem>
          <FormInput
            objKey="billToCity"
            color="darkThemeWhite"
            label="City"
            type="text"
            validationObj={{
              required: "Required",
            }}
          ></FormInput>
        </GridItem>
        <GridItem>
          <FormInput
            objKey="billToPostCode"
            color="darkThemeWhite"
            label="Post Code"
            type="text"
            validationObj={{
              required: "Required",
              maxLength: {
                value: 6,
                message: "max length is 6",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "post code should only be numbers",
              },
            }}
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="billToCountry"
            color="darkThemeWhite"
            label="Country"
            type="text"
            validationObj={{
              required: "Required",
            }}
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="date"
            label="Invoice Date"
            color="darkThemeGrey"
            type="date"
            validationObj={{
              required: "Required",
            }}
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormLabel
            height="31px"
            fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
            color="darkThemeGrey"
            fontWeight="500"
            lineHeight="1.4"
            validationObj={{
              required: "Required",
            }}
          >
            Payment Terms
          </FormLabel>
          <FormSelect></FormSelect>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="description"
            color="darkThemeWhite"
            label="Project / Description"
            defaultValue=""
            type="text"
            validationObj={{
              required: "Required",
            }}
          ></FormInput>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BillTo;
