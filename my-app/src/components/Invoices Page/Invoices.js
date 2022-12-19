import React from "react";
import InvoiceTab from "./InvoiceTab";
import Invoice from "./Invoice";
import { Flex } from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../../firestore";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../store/invoice-slice";
import { useLocation } from "react-router-dom";
import Empty from "./Empty";
import convertSecondsToDate from "../helper-functions/convertSecondsToDate";
let displayedInvoices = [];
const Invoices = () => {
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const collectionRef = collection(database, "invoices");
  const dispatch = useDispatch();
  useEffect(() => {
    const getInvoices = async () => {
      setIsLoading(true);
      onSnapshot(collectionRef, (data) => {
        const invoices = data.docs.map((item) => {
          return item.data();
        });
        // convert non-serialized data before pushing it to redux
        const cleanedInvoices = invoices.map((invoice) => {
          invoice.billTo.invoice.date = convertSecondsToDate(
            invoice.billTo.invoice.date.seconds
          );
          invoice.billTo.invoice.paymentDue = convertSecondsToDate(
            invoice.billTo.invoice.paymentDue.seconds
          );
          return invoice;
        });
        dispatch(invoiceActions.getInvoices(cleanedInvoices));
        setIsLoading(false);
      });
    };
    getInvoices();
  }, [pathname]);
  const { invoices, filteredInvoices } = useSelector((state) => state.invoice);
  if (!isLoading) {
    if (filteredInvoices.length > 0) displayedInvoices = filteredInvoices;
    else displayedInvoices = invoices;
  }

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
      {isLoading && <p>Loading....</p>}
      {!isLoading &&
        displayedInvoices.map((invoice) => {
          return (
            <Invoice
              key={invoice.id}
              id={invoice.id}
              clientEmail={invoice.billTo.clientEmail}
              clientName={invoice.billTo.clientName}
              paymentDue={invoice.billTo.invoice.paymentDue}
              grandTotal={invoice.itemList.grandTotal}
              status={invoice.status}
            ></Invoice>
          );
        })}
      {!isLoading && displayedInvoices.length === 0 && <Empty></Empty>}
    </Flex>
  );
};

export default Invoices;
