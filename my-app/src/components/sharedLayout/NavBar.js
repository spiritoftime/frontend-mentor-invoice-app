import React from "react";
import classes from "./navbar.module.css";
import { Flex, Box, Stack, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { displayName, photoUrl } = useSelector((state) => state.Login);
  return (
    <Stack
      justify="space-between"
      backgroundColor="darkThemeInput"
      as="nav"
      direction={{ md: "column" }}
      position={{ base: "initial", md: "fixed" }}
      height={{ md: "100%" }}
      width={{ md: "72px" }}
      borderRadius={{ md: "0px 30px 0 0" }}
    >
      <Flex
        justify="center"
        align="center"
        width="72px"
        height="72px"
        className={classes["logo-box"]}
      >
        <svg
          width="28px"
          height="26px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 26"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
          ></path>
        </svg>
      </Flex>
      <Flex
        margin={{ md: "0 auto" }}
        direction={{ md: "column" }}
        justify="center"
        align="center"
        gap="24px"
      >
        <Box
          paddingRight={{ base: "23px", md: 0 }}
          borderRight={{ base: "1px solid rgba(73, 78, 110, 1)", md: "0px" }}
          display="flex"
          height="100%"
          paddingBottom={{ md: "23px" }}
          alignItems="center"
          justifyContent="center"
          width="100%"
          borderBottom={{ md: "1px solid rgba(73, 78, 110, 1)" }}
        >
          <svg
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.66 19.63"
          >
            <path
              d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
              fill="#858BB2"
              fillRule="nonzero"
            ></path>
          </svg>
        </Box>
        <Box
          display="flex"
          paddingRight={{ base: "23px", md: 0 }}
          paddingBottom={{ md: "23px" }}
          height="100%"
          alignItems="center"
        >
          <Avatar
            width="32px"
            height="32px"
            name={displayName}
            src={photoUrl}
          />
        </Box>
      </Flex>
    </Stack>
  );
};

export default NavBar;
