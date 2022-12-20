import React from "react";
import {
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  FormHelperText,
} from "@chakra-ui/react";
const FormInput = ({ label, defaultValue, type }) => {
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
        height="40px"
        color="darkThemeWhite"
        border="none"
        bg="#1E2139"
        type={type}
      />
    </Box>
  );
};

export default FormInput;
