import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Stack, Box, Button, Text } from "@chakra-ui/react";
import ItemArticle from "../sharedLayout/ItemArticle";
import BillFrom from "../sharedLayout/BillFrom";
import BillTo from "../sharedLayout/BillTo";

export const RegisterContext = React.createContext();
const EditInvoice = ({ defaultValues, isEdit }) => {
  const [articles, setArticles] = useState([1]);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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
            {articles.map((num) => (
              <ItemArticle></ItemArticle>
            ))}
          </Stack>
          <Button
            onClick={() =>
              setArticles((prevstate) => [
                ...prevstate,
                `${prevstate.at(-1) + 1}`,
              ])
            }
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
