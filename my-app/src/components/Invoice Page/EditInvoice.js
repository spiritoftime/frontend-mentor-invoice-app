import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Stack, Box, Button, Text } from "@chakra-ui/react";
import ItemArticle from "../sharedLayout/ItemArticle";
import BillFrom from "../sharedLayout/BillFrom";
import BillTo from "../sharedLayout/BillTo";

export const RegisterContext = React.createContext();
const EditInvoice = ({ defaultValues, isEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const getInputData = useCallback(register, [register]);

  return (
    <RegisterContext.Provider value={getInputData}>
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
            <ItemArticle></ItemArticle>
          </Stack>
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
            + Add New Item
          </Button>
        </Stack>
      </Box>
    </RegisterContext.Provider>
  );
};

export default EditInvoice;
