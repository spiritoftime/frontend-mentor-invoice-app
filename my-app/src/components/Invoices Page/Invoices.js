import React from "react";
import InvoiceTab from "./InvoiceTab";
import Invoice from "./Invoice";
import { Flex } from "@chakra-ui/react";
const Invoices = () => {
  return (
    <Flex
      gap="32px"
      direction="column"
      padding="32px 0"
      as="section"
      bg="#141625"
    >
      <InvoiceTab></InvoiceTab>
      <Invoice></Invoice>
    </Flex>
  );
};

export default Invoices;
