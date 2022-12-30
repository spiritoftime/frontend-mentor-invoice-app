import React, { useRef, useEffect } from "react";
import { Card, Text, Box, CardBody } from "@chakra-ui/react";
import classes from "./statusbox.module.css";
const StatusBox = (props) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.style.setProperty("--color", props.color);
  }, []);

  return (
    <Card ref={ref} align="center" width="104px" className={classes["overlay"]}>
      <CardBody display="flex" alignItems="center" gap="3px">
        <Box
          backgroundColor={props.color}
          width="10px"
          height="10px"
          borderRadius="50%"
        ></Box>
        <Text
          fontSize="0.75rem"
          fontWeight="700"
          lineHeight="1.25"
          color={props.color}
        >
          {props.status}
        </Text>
      </CardBody>
    </Card>
  );
};

export default StatusBox;
