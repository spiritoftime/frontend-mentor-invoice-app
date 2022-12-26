import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Stack, Box, Button, Text, Flex, ButtonGroup } from "@chakra-ui/react";
import ItemArticle from "../sharedLayout/ItemArticle";
import FooterButton from "../UI/FooterButton";
import BillFrom from "../sharedLayout/BillFrom";
import BillTo from "../sharedLayout/BillTo";
import { database } from "../../firestore";
import { createInvoiceObj } from "../helper-functions/createInvoiceObj";
import { useParams } from "react-router-dom";
import convertDateToInputDate from "../helper-functions/convertDateToInputDate";
import {
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import GobackButton from "../UI/GobackButton";
import createItemsArr from "../helper-functions/createItemsArr";
const EditInvoice = () => {
  const userUID = useSelector((state) => state.Login.uid);
  const params = useParams();
  const queriedInvoice = useSelector((state) => state.invoice.queriedInvoice);

  const itemsArr = createItemsArr(queriedInvoice);

  const itemsObj = itemsArr.reduce((initialObj, itemObj) => {
    return { ...initialObj, ...itemObj };
  }, {});

  const collectionRef = collection(database, "users", userUID, "invoices");
  let preLoadedValues = {};
  if (Object.keys(params).length !== 0)
    preLoadedValues = {
      address: queriedInvoice.billFrom.addressDetails.address,
      city: queriedInvoice.billFrom.addressDetails.city,
      postCode: queriedInvoice.billFrom.addressDetails.postCode,
      country: queriedInvoice.billFrom.addressDetails.country,
      clientEmail: queriedInvoice.billTo.clientEmail,
      clientName: queriedInvoice.billTo.clientName,
      billToAddress: queriedInvoice.billTo.addressDetails.address,
      billToCity: queriedInvoice.billTo.addressDetails.city,
      billToPostCode: queriedInvoice.billTo.addressDetails.postCode,
      billToCountry: queriedInvoice.billTo.addressDetails.country,
      date: convertDateToInputDate(queriedInvoice.billTo.invoice.date),
      paymentTerms: queriedInvoice.billTo.invoice.paymentTerms,

      description: queriedInvoice.billTo.invoice.description,
      ...itemsObj,
    };

  const methods = useForm({
    defaultValues: preLoadedValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  let initialItemArticles = ["item 1"];
  if (Object.keys(params).length !== 0) {
    const arr = [];
    for (let i = 0; i < Object.keys(itemsObj).length; i++) {
      arr.push(`item ${i + 1}`);
    }
    initialItemArticles = arr;
  }
  const [itemArticles, setItemArticles] = useState(initialItemArticles);
  const addItem = () => {
    const itemNumber = itemArticles.at(-1).split(" ")[1];
    setItemArticles((prevstate) => [...prevstate, `item ${+itemNumber + 1}`]);
  };

  return (
    <Box bg="darkThemeBg">
      <GobackButton ml="3%"></GobackButton>
      <FormProvider {...methods}>
        <Box
          onSubmit={handleSubmit((data) => {
            const invoiceObj = createInvoiceObj(data);
            addDoc(collectionRef, invoiceObj);
          })}
          as="form"
        >
          <Stack direction="column" gap={10} p={6} align="center">
            <BillFrom></BillFrom>
            <BillTo></BillTo>
            <Stack direction="column">
              <Text
                fontSize="clamp(1.15rem, 0.9rem + 2vw, 2.4rem)"
                color="rgba(119, 127, 152, 1)"
                fontWeight="700"
                marginBottom={6}
              >
                Item List
              </Text>
              <Stack direction="column" gap={12}>
                {itemArticles.map((itemNumber) => (
                  <ItemArticle
                    itemArticles={itemArticles}
                    setItemArticles={setItemArticles}
                    key={itemNumber}
                    id={itemNumber}
                  ></ItemArticle>
                ))}
              </Stack>
            </Stack>
            <Button
              onClick={addItem}
              justifyContent="center"
              borderRadius="30px"
              width="min(100%, 327px)"
              height="48px"
              variant="solid"
              color="darkThemeGrey"
              bg="#1E2139"
              fontSize="0.75rem"
              fontWeight="700"
              lineHeight="0.9rem"
            >
              + Add New Item
            </Button>
          </Stack>
        </Box>
        <Flex
          position="relative"
          bottom="-82px"
          left="0"
          width="100%"
          backgroundColor="darkThemeInput"
          margin="0 auto"
          justify="center"
        >
          <ButtonGroup
            justifyContent="space-between"
            gap="8px"
            padding="21px 10px"
          >
            <FooterButton
              onClick={() => {}}
              color="#252945"
              text="Discard"
            ></FooterButton>
            <FooterButton color="#373B53" text="Save as Draft"></FooterButton>
            <FooterButton
              onClick={() => {}}
              color="#7C5DFA"
              text="Save & Send"
            ></FooterButton>
          </ButtonGroup>
        </Flex>
      </FormProvider>
    </Box>
  );
};

export default EditInvoice;
