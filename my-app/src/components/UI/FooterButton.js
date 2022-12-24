import React from "react";
import { Button } from "@chakra-ui/react";
const FooterButton = (props) => {
  return (
    <Button
      onClick={props.onClick}
      borderRadius="30px"
      fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
      color="darkThemeWhite"
      fontWeight="700"
      lineHeight="1.4"
      backgroundColor={props.color}
    >
      {props.text}
    </Button>
  );
};

export default FooterButton;
