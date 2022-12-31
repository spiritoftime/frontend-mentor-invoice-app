import React from "react";
import { Button, Flex, Box, Text, Select, Icon } from "@chakra-ui/react";
import classes from "./invoicetab.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../redux-store/invoice-slice";
import useViewPort from "../custom-hooks/useViewPort";
const InvoiceTab = () => {
  const theme = useSelector((state) => state.theme.isLight);
  const { invoices, filteredInvoices, filteredBy } = useSelector(
    (state) => state.invoice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectRouteHandler = () => {
    navigate("/new-invoice");
  };
  const width = useViewPort();
  return (
    <Flex
      align="center"
      margin="0 auto"
      width={{ base: "90%", sm: "672px", "2xl": "730px" }}
      justify="space-between"
      height="44px"
    >
      <Flex direction="column">
        <Text
          fontSize="1.25rem"
          color={!theme ? "white" : "#0C0E16"}
          fontWeight="700"
        >
          Invoices
        </Text>
        <Text
          fontSize="0.75rem"
          color="darkThemeGrey"
          fontWeight="700"
          lineHeight="0.9rem"
        >
          {width < 768 ? "" : "There are "}
          {filteredBy === ""
            ? invoices.length
            : filteredInvoices.length + " " + filteredBy}{" "}
          {width < 768 ? "" : "total "}
          invoices
        </Text>
      </Flex>
      <Flex align="center">
        <Flex>
          <Select
            onChange={(e) => {
              dispatch(invoiceActions.filterInvoices(e.target.value));
            }}
            border="0px"
            iconColor="rgba(124, 93, 250, 1)"
            color={!theme ? "darkThemeWhite" : "#0c0e16 "}
            fontWeight="700"
            fontSize="0.75rem"
            lineHeight="0.9rem"
          >
            <option
              className={!theme ? classes["option"] : classes["light-option"]}
              value="Filter"
            >
              {width < 768 ? "Filter" : "Filter By Status"}
            </option>
            <option
              className={!theme ? classes["option"] : classes["light-option"]}
              value="Draft"
            >
              Draft
            </option>
            <option
              className={!theme ? classes["option"] : classes["light-option"]}
              value="Pending"
            >
              Pending
            </option>
            <option
              className={!theme ? classes["option"] : classes["light-option"]}
              value="Paid"
            >
              Paid
            </option>
          </Select>
        </Flex>

        <Button
          _hover={{
            background: "#9277FF",
            color: "white",
          }}
          borderRadius="30px"
          onClick={redirectRouteHandler}
          backgroundColor="#7C5DFA"
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
          {width < 768 ? "New" : "New Invoice"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default InvoiceTab;
