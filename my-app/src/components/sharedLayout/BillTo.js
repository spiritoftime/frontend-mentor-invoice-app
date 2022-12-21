import React from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Box, Text, Grid, GridItem, FormLabel } from "@chakra-ui/react";
const BillTo = () => {
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={6}>
      <Text
        fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
        color="rgba(124, 93, 250, 1)"
        fontWeight="500"
        lineHeight="1.4"
      >
        Bill To
      </Text>
      <Grid rowGap={6} columnGap={6} templateColumns="repeat(2,1fr)">
        <GridItem colSpan={2}>
          <FormInput
            objKey="clientName"
            color="darkThemeWhite"
            label="Client's Name"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="clientEmail"
            color="darkThemeWhite"
            label="Client's Email"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="billToAddress"
            color="darkThemeWhite"
            label="Street Address"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem>
          <FormInput
            objKey="billToCity"
            color="darkThemeWhite"
            label="City"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem>
          <FormInput
            objKey="billToPostCode"
            color="darkThemeWhite"
            label="Post Code"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="billToCountry"
            color="darkThemeWhite"
            label="Country"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            objKey="date"
            label="Invoice Date"
            defaultValue="2022-12-21"
            color="darkThemeGrey"
            type="date"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormLabel
            height="31px"
            fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
            color="darkThemeGrey"
            fontWeight="500"
            lineHeight="1.4"
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
          ></FormInput>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BillTo;
