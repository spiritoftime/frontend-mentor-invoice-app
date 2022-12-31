import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const GobackButton = ({ ml = "0" }) => {
  const theme = useSelector((state) => state.theme.isLight);
  const navigate = useNavigate();
  let hoverObj = { background: "darkThemeBg", color: "white" };
  if (theme) {
    hoverObj = { background: "white", color: "#7E88C3" };
  }
  return (
    <Button
      _hover={hoverObj}
      onClick={() => {
        navigate("/invoices");
      }}
      margin={`32px 0 0 ${ml}`}
      width="81px"
      height="15px"
      background="none"
      color={!theme ? "darkThemeWhite" : "#7E88C3"}
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
