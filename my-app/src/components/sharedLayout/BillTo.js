import React from "react";
import FormInput from "./FormInput";
import { Select, Box, Text, Grid, GridItem } from "@chakra-ui/react";
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
            label="Client's Name"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            label="Client's Email"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            label="Street Address"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem>
          <FormInput label="City" defaultValue="" type="text"></FormInput>
        </GridItem>
        <GridItem>
          <FormInput label="Post Code" defaultValue="" type="text"></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput label="Country" defaultValue="" type="text"></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            label="Invoice Date"
            defaultValue="2022-12-21"
            type="date"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <Select></Select>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
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
