import React from "react";
import { Button } from "@chakra-ui/react";
const FooterButton = (props) => {
  return (
    <Button
      type={props.type}
      onClick={props.onClick}
      borderRadius="30px"
      fontSize={{
        base: "0.75rem",
        sm: "1rem",
      }}
      lineHeight="1.25"
      letterSpacing="-0.25px"
      color="darkThemeWhite"
      fontWeight="700"
      backgroundColor={props.color}
    >
      {props.text}
    </Button>
  );
};

export default FooterButton;
