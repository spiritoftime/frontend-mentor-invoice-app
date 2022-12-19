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
import classes from "./invoice.module.css";
const Invoice = (props) => {
  return (
    <Card color="white" margin="0 auto" height="134px" width="90%" bg="#1E2139">
      <CardBody>
        <Grid gap="24px" templateColumns="repeat(2,1fr)">
          <GridItem display="flex" justify="center" alignItems="center">
            <Text color="rgba(126, 136, 195, 1)">#</Text>
            <Text
              fontSize="0.75rem"
              color="white"
              fontWeight="700"
              lineHeight="0.9rem"
            >
              {props.id}
            </Text>
          </GridItem>
          <GridItem justifySelf="end">
            <Text
              fontSize="0.75rem"
              color="white"
              fontWeight="700"
              lineHeight="0.9rem"
            >
              {props.clientName}
            </Text>
          </GridItem>
          <GridItem>
            <Flex gap="4px" direction="column" justify="space-between">
              <Text
                fontSize="0.75rem"
                color="white"
                fontWeight="500"
                lineHeight="0.9rem"
              >
                Due {props.paymentDue}
              </Text>
              <Text fontSize="1.25rem" color="white" fontWeight="700">
                £{props.grandTotal}
              </Text>
            </Flex>
          </GridItem>
          <GridItem colStart={2} colEnd={3}>
            <Card align="center" className={classes["overlay"]}>
              <CardBody display="flex" alignItems="center" gap="3px">
                <Box
                  backgroundColor="#FF8F00"
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                ></Box>
                <Text
                  fontSize="0.75rem"
                  fontWeight="700"
                  lineHeight="0.9rem"
                  color="#FF8F00"
                >
                  {props.status}
                </Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Invoice;
