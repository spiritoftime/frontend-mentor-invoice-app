import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Stack, Box, Button, Text } from "@chakra-ui/react";
import ItemArticle from "../sharedLayout/ItemArticle";
import BillFrom from "../sharedLayout/BillFrom";
import BillTo from "../sharedLayout/BillTo";

const EditInvoice = ({ defaultValues, isEdit }) => {
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
    <FormProvider {...methods}>
      <Box
        onSubmit={handleSubmit((data) => console.log(data))}
        as="form"
        bg="darkThemeBg"
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
                <ItemArticle key={itemNumber} id={itemNumber}></ItemArticle>
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
  );
};

export default EditInvoice;
