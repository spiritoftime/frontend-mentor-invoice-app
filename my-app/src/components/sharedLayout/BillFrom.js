import React from "react";
import FormInput from "./FormInput";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
const BillFrom = () => {
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={6}>
      <Text
        fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
        color="rgba(124, 93, 250, 1)"
        fontWeight="500"
        lineHeight="1.4"
      >
        Bill From
      </Text>
      <Grid rowGap={6} columnGap={6} templateColumns="repeat(2,1fr)">
        <GridItem colSpan={2}>
          <FormInput
            label="Street Address"
            defaultValue=""
            type="text"
            color="darkThemeWhite"
          ></FormInput>
        </GridItem>
        <GridItem>
          <FormInput
            color="darkThemeWhite"
            label="City"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem>
          <FormInput
            color="darkThemeWhite"
            label="Post Code"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            color="darkThemeWhite"
            t
            label="Country"
            defaultValue=""
            type="text"
          ></FormInput>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BillFrom;
