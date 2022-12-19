import React from "react";
import InvoiceTab from "./InvoiceTab";
import Invoice from "./Invoice";
import { Flex } from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../../firestore";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../store/invoice-slice";
import Empty from "./Empty";
import convertSecondsToDate from "../helper-functions/convertSecondsToDate";
const Invoices = () => {
  const collectionRef = collection(database, "invoices");
  const dispatch = useDispatch();
  useEffect(() => {
    const getInvoices = async () =>
      onSnapshot(collectionRef, (data) => {
        const invoices = data.docs.map((item) => {
          return item.data();
        });
        const cleanedInvoices = invoices.map((invoice) => {
          invoice.billTo.invoice.date.seconds = convertSecondsToDate(
            invoice.billTo.invoice.date.seconds
          );
          invoice.billTo.invoice.paymentDue.seconds = convertSecondsToDate(
            invoice.billTo.invoice.paymentDue.seconds
          );
          return invoice;
        });
        console.log(cleanedInvoices);
        dispatch(invoiceActions.getInvoices(cleanedInvoices));
      });
    getInvoices();
  }, []);
  const invoices = useSelector((state) => state.invoice.invoices);
  return (
    <Flex
      minBlockSize="100vh"
      gap="32px"
      direction="column"
      padding="32px 0"
      as="section"
      bg="#141625"
    >
      <InvoiceTab></InvoiceTab>
      {invoices.map((invoice) => {
        return (
          <Invoice
            key={invoice.id}
            id={invoice.id}
            clientEmail={invoice.billTo.clientEmail}
            clientName={invoice.billTo.clientName}
            paymentDue={invoice.billTo.invoice.paymentDue.seconds}
            grandTotal={invoice.itemList.grandTotal}
            status={invoice.status}
          ></Invoice>
        );
      })}
      {invoices.length === 0 && <Empty></Empty>}
    </Flex>
  );
};

export default Invoices;
