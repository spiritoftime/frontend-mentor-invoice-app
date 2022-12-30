import React from "react";
import {
  Grid,
  GridItem,
  Card,
  CardHeader,
  Text,
  CardBody,
  CardFooter,
  Icon,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import StatusBox from "../UI/StatusBox";
const Invoice = (props) => {
  const navigate = useNavigate();

  return (
    <Card
      width={{ base: "90%", sm: "672px", "2xl": "730px" }}
      onClick={() => {
        navigate(`/invoices/${props.docId}`);
      }}
      color="white"
      margin="0 auto"
      bg="darkThemeInput"
    >
      <CardBody>
        <Grid
          fontSize="0.75rem"
          lineHeight="1.25"
          letterSpacing="-0.25px"
          alignItems="center"
          gridAutoFlow={{ base: "inherit", sm: "column", "2xl": "column" }}
          gap="24px"
          templateColumns={{ base: "repeat(2,1fr)", sm: "auto", "2xl": "auto" }}
        >
          <GridItem display="flex" justify="center" alignItems="center">
            <Text color="hashColor">#</Text>
            <Text color="darkThemeWhite" fontWeight="700">
              {props.id}
            </Text>
          </GridItem>
          <GridItem
            gridColumnStart={{ base: "initial", sm: "3" }}
            alignSelf="center"
            justifySelf="end"
          >
            <Text color="darkThemeGrey" fontWeight="500">
              {props.clientName}
            </Text>
          </GridItem>
          <GridItem gridColumnStart={{ base: "initial", sm: "2" }}>
            <Flex
              gap="4px"
              alignItems={{ base: "flex-start", sm: "center" }}
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
            >
              <Text color="darkThemeGrey" fontWeight="500">
                Due {props.paymentDue}
              </Text>
              <Text
                fontSize="1rem"
                letterSpacing="-0.8px"
                lineHeight="1.5"
                color="white"
                fontWeight="700"
              >
                £ {props.grandTotal.toFixed(2)}
              </Text>
            </Flex>
          </GridItem>
          <GridItem alignSelf="center" justifySelf="end">
            <StatusBox
              status={props.status}
              color={
                props.status === "Pending"
                  ? "#FF8F00"
                  : props.status === "Paid"
                  ? "#33D69F"
                  : "#DFE3FA"
              }
            ></StatusBox>
          </GridItem>
          <GridItem justifySelf="end" display={{ base: "none", sm: "block" }}>
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1l4 4-4 4"
                stroke="#7C5DFA"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Invoice;
