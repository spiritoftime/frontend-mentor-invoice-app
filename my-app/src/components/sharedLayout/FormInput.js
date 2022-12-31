import React from "react";
import { FormLabel, Input, Box, Text } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const FormInput = ({ label, type, color, objKey, validationObj = {} }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const theme = useSelector((state) => state.theme.isLight);
  const params = useParams();

  if (Object.keys(params).length !== 0)
    return (
      <Box width="100%">
        <FormLabel
          height="31px"
          fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
          color={!theme ? "darkThemeGrey" : "#7E88C3"}
          fontWeight="500"
          lineHeight="1.4"
        >
          {label}
        </FormLabel>
        <Input
          {...register(objKey, validationObj)}
          height="40px"
          border={!theme ? "none" : "1px solid rgba(223, 227, 250, 1)"}
          type={type}
          color={!theme ? color : "#0C0E16"}
          bg={!theme ? "darkThemeInput" : "#F9FAFE"}
          fontWeight="700"
          lineHeight="1.25"
          letterSpacing="-0.25px"
          fontSize="0.75rem"
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
        color={!theme ? color : "#0C0E16"}
        bg={!theme ? "darkThemeInput" : "#F9FAFE"}
        fontWeight="700"
        lineHeight="1.25"
        letterSpacing="-0.25px"
        fontSize="0.75rem"
        border={!theme ? "none" : "1px solid rgba(223, 227, 250, 1)"}
        height="40px"
        type={type}
      />
      <ErrorMessage
        errors={errors}
        name={objKey}
        render={({ message }) => (
          <Text
            fontSize="0.75rem"
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
