import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Text,
  Stack,
  Flex,
  Heading,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { LoginActions } from "../../redux-store/login-slice";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  return (
    <Flex
      minHeight="calc(100vh - 72px)"
      backgroundColor="darkThemeGrey"
      justify="center"
      align="center"
    >
      <Card
        minWidth="90%"
        minHeight="25vh"
        boxShadow="md"
        backgroundColor="whiteAlpha.900"
        align="center"
      >
        <CardHeader>
          <Heading size="md">Login</Heading>
        </CardHeader>
        <Button
          onClick={() => {
            signInWithPopup(auth, googleProvider).then((res) => {
              console.log({
                uid: res.user.uid,
                displayName: res.user.displayName,
                photoUrl: res.user.photoURL,
                isLogin: true,
              });
              dispatch(
                LoginActions.getLoginDetails({
                  uid: res.user.uid,
                  displayName: res.user.displayName,
                  photoUrl: res.user.photoURL,
                  isLogin: true,
                })
              );
              navigate("/invoices");
            });
          }}
          justifyContent="center"
          borderRadius="30px"
          width="min(100%, 327px)"
          height="48px"
          variant="solid"
          color="darkThemeGrey"
          bg="#1E2139"
          fontSize="0.75rem"
          fontWeight="700"
          lineHeight="0.9rem"
        >
          Login with Google
        </Button>
      </Card>
    </Flex>
  );
};

export default Login;
