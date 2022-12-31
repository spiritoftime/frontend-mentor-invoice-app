import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Flex,
  Stack,
  Box,
  Button,
  ButtonGroup,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ItemArticle from "../sharedLayout/ItemArticle";
import BillFrom from "../sharedLayout/BillFrom";
import BillTo from "../sharedLayout/BillTo";
import { database } from "../../firestore";
import { createInvoiceObj } from "../helper-functions/createInvoiceObj";
import FooterButton from "../UI/FooterButton";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import GobackButton from "../UI/GobackButton";
const NewInvoice = () => {
  const userUID = useSelector((state) => state.Login.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const collectionRef = collection(database, "users", userUID, "invoices");
  const methods = useForm();
  const theme = useSelector((state) => state.theme.isLight);
  const { handleSubmit } = methods;
  const [itemArticles, setItemArticles] = useState(["item 1"]);
  const addItem = () => {
    const itemNumber = itemArticles.at(-1).split(" ")[1];
    setItemArticles((prevstate) => [...prevstate, `item ${+itemNumber + 1}`]);
  };

  return (
    <Box bg={!theme ? "darkThemeBg" : "white"} minHeight="100vh">
      <Box margin="0 auto" width={{ sm: "616px", md: "720px" }}>
        <GobackButton ml="24px"></GobackButton>
        <Flex
          display="flex"
          justify="flex-start"
          alignItems="center"
          fontSize="clamp(1.5rem, 0.9rem + 2vw, 1.6rem)"
          fontWeight="700"
          lineHeight="1.25"
          paddingLeft={6}
          paddingTop={6}
        >
          <Text color={!theme ? "darkThemeWhite" : "#0C0E16"}>New Invoice</Text>
        </Flex>
        <FormProvider {...methods}>
          <Box as="form">
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
                hover={{ background: "#3b3e58", color: "white" }}
                variant="solid"
                color="darkThemeGrey"
                bg={!theme ? "#1E2139" : " rgba(249, 250, 254, 1)"}
                border={!theme ? "0px" : "1px solid rgba(200, 227, 250, 1)"}
                fontSize="0.75rem"
                fontWeight="700"
                lineHeight="0.9rem"
              >
                + Add New Item
              </Button>
            </Stack>
            <Flex
              backgroundColor={
                !theme
                  ? { base: "darkThemeInput", sm: "darkThemeBg" }
                  : "#FFFFFF"
              }
              position={{ base: "relative", sm: "initial" }}
              bottom="-82px"
              left="0"
              width="100%"
              margin="0 auto"
              justify="center"
            >
              <ButtonGroup
                justifyContent="space-between"
                gap="8px"
                padding="21px 10px"
              >
                <FooterButton
                  onClick={onOpen}
                  color="#252945"
                  hover={{ background: "#3b3e58", color: "white" }}
                  text="Discard"
                ></FooterButton>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent
                    width="90%"
                    background={!theme ? "darkThemeInput" : "#FFFFFF"}
                  >
                    <ModalHeader
                      color={!theme ? "darkThemeWhite" : "#0C0E16"}
                      fontSize="clamp(1.5rem, 0.9rem + 2vw, 1.6rem)"
                      fontWeight="700"
                      lineHeight="1.25"
                    >
                      Confirm Discard
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                      fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                      color={!theme ? "darkThemeGreyWhite" : "#888EB0"}
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
                        hover={{ background: "#3b3e58", color: "white" }}
                        text="Cancel"
                      ></FooterButton>
                      <FooterButton
                        onClick={async () => {
                          navigate("/invoices");
                        }}
                        hover={{ background: "#FF9797", color: "white" }}
                        color="#EC5757"
                        text="Discard"
                      ></FooterButton>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <FooterButton
                  type="submit"
                  color="#373B53"
                  hover={{ background: "#3b3e58", color: "white" }}
                  onClick={handleSubmit((data) => {
                    const invoiceObj = createInvoiceObj(data);
                    invoiceObj.status = "Draft";
                    addDoc(collectionRef, invoiceObj);
                    navigate("/invoices");
                  })}
                  text="Save as Draft"
                ></FooterButton>
                <FooterButton
                  onClick={handleSubmit((data) => {
                    const invoiceObj = createInvoiceObj(data);
                    addDoc(collectionRef, invoiceObj);
                    navigate("/invoices");
                  })}
                  hover={{
                    background: "#9277FF",
                    color: "white",
                  }}
                  type="submit"
                  color="#7C5DFA"
                  text="Save & Send"
                ></FooterButton>
              </ButtonGroup>
            </Flex>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default NewInvoice;
