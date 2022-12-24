import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const GobackButton = ({ ml }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate("/invoices");
      }}
      margin={`32px 0 0 ${ml}`}
      width="81px"
      height="15px"
      background="none"
      color="darkThemeWhite"
      leftIcon={
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            stroke-width="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      }
    >
      Go Back
    </Button>
  );
};

export default GobackButton;
