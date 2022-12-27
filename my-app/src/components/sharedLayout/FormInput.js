import React from "react";
import { FormLabel, Input, Box, Text } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
const FormInput = ({ label, type, color, objKey, validationObj = {} }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
          {...register(objKey, validationObj)}
          height="40px"
          color={color}
          border="none"
          bg="darkThemeInput"
          type={type}
        />

        <ErrorMessage
          errors={errors}
          name={objKey}
          render={({ message }) => (
            <Text
              fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
              lineHeight="1.4"
              fontWeight="500"
              color="tomato"
            >
              {message}
            </Text>
          )}
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
        {...register(objKey, validationObj)}
        height="40px"
        color={color}
        border="none"
        bg="darkThemeInput"
        type={type}
      />
      <ErrorMessage
        errors={errors}
        name={objKey}
        render={({ message }) => (
          <Text
            fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
            lineHeight="1.4"
            fontWeight="500"
            color="tomato"
          >
            {message}
          </Text>
        )}
      />
    </Box>
  );
};

export default FormInput;
