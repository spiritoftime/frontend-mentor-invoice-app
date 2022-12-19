import React from "react";
import {
  Button,
  Flex,
  Spacer,
  Box,
  Stack,
  HStack,
  Text,
  Select,
  Icon,
  Checkbox,
} from "@chakra-ui/react";
import classes from "./invoicetab.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../store/invoice-slice";
const InvoiceTab = () => {
  const { invoices, filteredInvoices, filteredBy } = useSelector(
    (state) => state.invoice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectRouteHandler = () => {
    navigate("/new-invoice");
  };

  return (
    <Flex
      align="center"
      margin="0 auto"
      width="90%"
      justify="space-between"
      height="44px"
    >
      <Flex direction="column">
        <Text fontSize="1.25rem" color="white" fontWeight="700">
          Invoices
        </Text>
        <Text
          fontSize="0.75rem"
          color="#DFE3FA"
          fontWeight="700"
          lineHeight="0.9rem"
        >
          {filteredBy === ""
            ? invoices.length
            : filteredInvoices.length + " " + filteredBy}{" "}
          invoices
        </Text>
      </Flex>
      <Flex justify="flex-end">
        <Select
          onChange={(e) => {
            dispatch(invoiceActions.filterInvoices(e.target.value));
          }}
          border="none"
          placeholder="Filter"
          iconColor="rgba(124, 93, 250, 1)"
          color="white"
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
      </Flex>
      <Flex
        onClick={redirectRouteHandler}
        borderRadius="50%"
        backgroundColor="#7C5DFA"
      >
        <Button
          width="90px"
          height="44px"
          variant="solid"
          color="white"
          bg="#7C5DFA"
          fontSize="0.75rem"
          fontWeight="700"
          lineHeight="0.9rem"
          leftIcon={
            <Box
              display="flex"
              width="32px"
              height="32px"
              borderRadius="50%"
              backgroundColor="white"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                width="10px"
                height="10px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0.02 0.02 10 10"
              >
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fillRule="nonzero"
                ></path>
              </Icon>
            </Box>
          }
        >
          New
        </Button>
      </Flex>
    </Flex>
  );
};

export default InvoiceTab;
