import React from "react";
import {
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const FormInput = ({ label, defaultValue, type, color, objKey = "hello" }) => {
  const { register } = useFormContext();

  return (
    <Box width="100%">
      <FormLabel
        height="31px"
        fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
        color="darkThemeGrey"
        fontWeight="500"
        lineHeight="1.4"
      >
        {label}
      </FormLabel>
      <Input
        {...register(objKey)}
        height="40px"
        color={color}
        border="none"
        bg="darkThemeInput"
        type={type}
        defaultValue={defaultValue}
      />
    </Box>
  );
};

export default FormInput;
