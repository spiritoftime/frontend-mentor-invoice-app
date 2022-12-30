import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Stack,
  Box,
  Button,
  Text,
  Flex,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import ItemArticle from "../sharedLayout/ItemArticle";
import FooterButton from "../UI/FooterButton";
import BillFrom from "../sharedLayout/BillFrom";
import BillTo from "../sharedLayout/BillTo";
import { database } from "../../firestore";
import { createInvoiceObj } from "../helper-functions/createInvoiceObj";
import { useParams } from "react-router-dom";
import convertDateToInputDate from "../helper-functions/convertDateToInputDate";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import GobackButton from "../UI/GobackButton";
import createItemsArr from "../helper-functions/createItemsArr";
import { useNavigate } from "react-router-dom";
let invoiceId = "";
let docRef = "";
const EditInvoice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const userUID = useSelector((state) => state.Login.uid);
  const params = useParams();

  const queriedInvoice = useSelector((state) => state.invoice.queriedInvoice);

  const itemsArr = createItemsArr(queriedInvoice);

  const itemsObj = itemsArr.reduce((initialObj, itemObj) => {
    return { ...initialObj, ...itemObj };
  }, {});

  let preLoadedValues = {};
  if (Object.keys(params).length !== 0) {
    ({ invoiceId } = params);
    docRef = doc(database, "users", userUID, "invoices", invoiceId);
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
  }

  const methods = useForm({
    defaultValues: preLoadedValues,
    shouldUnregister: true,
  });
  const { handleSubmit } = methods;
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
    <Box minHeight="100vh" bg="darkThemeBg">
      <Box margin="0 auto" width={{ sm: "616px", md: "720px" }}>
        <GobackButton ml="18px"></GobackButton>
        <Flex
          fontSize="clamp(1.5rem, 0.9rem + 2vw, 1.6rem)"
          display="flex"
          justify="flex-start"
          alignItems="center"
          fontWeight="700"
          lineHeight="1.25"
          paddingLeft={6}
          paddingTop={6}
        >
          <Text color="darkThemeWhite">
            Edit{" "}
            <Text color="hashColor" as="span">
              #
            </Text>
            {queriedInvoice.id}
          </Text>
        </Flex>
        <FormProvider {...methods}>
          <Box
            onSubmit={handleSubmit((data) => {
              const invoiceObj = createInvoiceObj(data);
              invoiceObj.status = queriedInvoice.status;
              invoiceObj.id = queriedInvoice.id;
              setDoc(docRef, invoiceObj);
              navigate("/invoices");
            })}
            as="form"
          >
            <Stack direction="column" gap={10} p={6} align="center">
              <BillFrom></BillFrom>
              <BillTo></BillTo>
              <Stack width="100%" direction="column">
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
            <Flex
              position="relative"
              bottom="-82px"
              left="0"
              width="100%"
              backgroundColor={{ base: "darkThemeInput", sm: "darkThemeBg" }}
              margin="0 auto"
              justify="end"
            >
              <ButtonGroup
                justifyContent="space-between"
                gap="8px"
                padding="21px 10px"
              >
                <FooterButton
                  onClick={onOpen}
                  color="#252945"
                  text="Cancel"
                ></FooterButton>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent width="90%" background="darkThemeInput">
                    <ModalHeader
                      color="darkThemeWhite"
                      fontSize="clamp(1.5rem, 0.9rem + 2vw, 1.6rem)"
                      fontWeight="700"
                      lineHeight="1.25"
                    >
                      Confirm Discard
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                      fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                      color="darkThemeGreyWhite"
                      fontWeight="500"
                      lineHeight="1.4"
                    >
                      Are you sure you want to discard changes? Your edits will
                      not be saved.
                    </ModalBody>

                    <ModalFooter gap={2}>
                      <FooterButton
                        onClick={onClose}
                        color="#252945"
                        text="Cancel"
                      ></FooterButton>
                      <FooterButton
                        onClick={async () => {
                          navigate("/invoices");
                        }}
                        color="#EC5757"
                        text="Discard"
                      ></FooterButton>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <FooterButton
                  type="submit"
                  color="#7C5DFA"
                  text="Save Changes"
                ></FooterButton>
              </ButtonGroup>
            </Flex>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default EditInvoice;
