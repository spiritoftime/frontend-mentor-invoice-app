import React from "react";
import {
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  FormHelperText,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
const FormInput = ({ label, type, color, objKey }) => {
  const { register } = useFormContext();

  const params = useParams();

  if (Object.keys(params).length !== 0)
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
        />
      </Box>
    );
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
      />
    </Box>
  );
};

export default FormInput;
