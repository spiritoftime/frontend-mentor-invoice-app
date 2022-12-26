import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Flex, Stack, Box, Button, Text } from "@chakra-ui/react";
import ItemArticle from "../sharedLayout/ItemArticle";
import BillFrom from "../sharedLayout/BillFrom";
import BillTo from "../sharedLayout/BillTo";
import { database } from "../../firestore";
import { createInvoiceObj } from "../helper-functions/createInvoiceObj";

import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import GobackButton from "../UI/GobackButton";
const NewInvoice = () => {
  const userUID = useSelector((state) => state.Login.uid);
  const collectionRef = collection(database, "users", userUID, "invoices");
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [itemArticles, setItemArticles] = useState(["item 1"]);
  const addItem = () => {
    const itemNumber = itemArticles.at(-1).split(" ")[1];
    setItemArticles((prevstate) => [...prevstate, `item ${+itemNumber + 1}`]);
  };

  return (
    <Box bg="darkThemeBg">
      <GobackButton ml="24px"></GobackButton>
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
        <Text color="darkThemeWhite">New Invoice</Text>
      </Flex>
      <FormProvider {...methods}>
        <Box
          onSubmit={handleSubmit((data) => {
            console.log(data);
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
            <Button
              type="submit"
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
              Submit
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default NewInvoice;
