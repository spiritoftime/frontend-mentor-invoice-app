import React from "react";
import { useForm } from "react-hook-form";
import { Stack, Box } from "@chakra-ui/react";
import FormInput from "../sharedLayout/FormInput";
import ItemArticle from "../sharedLayout/ItemArticle";
const EditInvoice = ({ defaultValues, isEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Box bg="darkThemeBg">
      <Stack direction="column" gap={6} p={6} align="flex-start">
        <FormInput
          label="Client's Name"
          defaultValue=""
          type="text"
        ></FormInput>

        <FormInput
          m={6}
          label="Client's Name"
          defaultValue=""
          type="text"
        ></FormInput>
        <ItemArticle></ItemArticle>
      </Stack>
    </Box>
  );
};

export default EditInvoice;
