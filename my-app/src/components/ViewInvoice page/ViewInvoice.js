import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, collection } from "firebase/firestore";
import { database } from "../../firestore";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../redux-store/invoice-slice";
import convertSecondsToDate from "../helper-functions/convertSecondsToDate";
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
const ViewInvoice = () => {
  const dispatch = useDispatch();
  const { invoiceId } = useParams();
  const uid = useSelector((state) => state.Login.uid);
  useEffect(() => {
    const queryData = async () => {
      // const queryData = () => {
      const docRef = doc(database, "users", uid, "invoices", invoiceId);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      docData.billTo.invoice.date = convertSecondsToDate(
        docData.billTo.invoice.date.seconds
      );
      docData.billTo.invoice.paymentDue = convertSecondsToDate(
        docData.billTo.invoice.paymentDue.seconds
      );
      console.log(docData);
      dispatch(invoiceActions.queryInvoice(docData));
    };
    queryData();
  }, []);
  const { queriedInvoice } = useSelector((state) => state.invoice);

  return (
    <Flex direction="column" minBlockSize="100vh" bg="darkThemeBg">
      <Card
        display="flex"
        direction="column"
        color="white"
        margin="80px auto 0 "
        height="95px"
        width="90%"
        bg="darkThemeInput"
      >
        <Text>Status</Text>
      </Card>
    </Flex>
  );
};

export default ViewInvoice;
