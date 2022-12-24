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
      onClick={() => {
        navigate(`/invoices/${props.docId}`);
      }}
      color="white"
      margin="0 auto"
      width="90%"
      bg="darkThemeInput"
    >
      <CardBody>
        <Grid gap="24px" templateColumns="repeat(2,1fr)">
          <GridItem
            fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
            display="flex"
            justify="center"
            alignItems="center"
          >
            <Text color="hashColor">#</Text>
            <Text color="darkThemeWhite" fontWeight="700" lineHeight="1.4">
              {props.id}
            </Text>
          </GridItem>
          <GridItem alignSelf="center" justifySelf="end">
            <Text
              fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
              color="darkThemeGrey"
              fontWeight="700"
              lineHeight="1.4"
            >
              {props.clientName}
            </Text>
          </GridItem>
          <GridItem>
            <Flex gap="4px" direction="column" justify="space-between">
              <Text
                fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                color="darkThemeGrey"
                fontWeight="500"
                lineHeight="1.4"
              >
                Due {props.paymentDue}
              </Text>
              <Text
                fontSize="clamp(1.15rem, 0.9rem + 2vw, 2.4rem)"
                color="white"
                fontWeight="700"
              >
                £ {props.grandTotal.toFixed(2)}
              </Text>
            </Flex>
          </GridItem>
          <GridItem
            alignSelf="center"
            justifySelf="end"
            colStart={2}
            colEnd={3}
          >
            <StatusBox status={props.status} color="#FF8F00"></StatusBox>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Invoice;
