import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setDoc, getDoc, doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firestore";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../redux-store/invoice-slice";
import convertSecondsToDate from "../helper-functions/convertSecondsToDate";
import {
  ButtonGroup,
  Text,
  Card,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import StatusBox from "../UI/StatusBox";
import GobackButton from "../UI/GobackButton";
import FooterButton from "../UI/FooterButton";
import { useNavigate } from "react-router-dom";
import useViewPort from "../custom-hooks/useViewPort";
const ViewInvoice = () => {
  const width = useViewPort();
  const theme = useSelector((state) => state.theme.isLight);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoiceId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const uid = useSelector((state) => state.Login.uid);
  const docRef = doc(database, "users", uid, "invoices", invoiceId);
  useEffect(() => {
    const queryData = async () => {
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      docData.billTo.invoice.date = convertSecondsToDate(
        docData.billTo.invoice.date.seconds
      );
      docData.billTo.invoice.paymentDue = convertSecondsToDate(
        docData.billTo.invoice.paymentDue.seconds
      );

      dispatch(invoiceActions.queryInvoice(docData));
    };
    queryData();
  }, []);
  const { queriedInvoice } = useSelector((state) => state.invoice);

  if (Object.keys(queriedInvoice).length === 0)
    return <Text>Still Loading...</Text>;
  return (
    <Flex
      alignItems="center"
      gap="6px"
      direction="column"
      minBlockSize="100vh"
      bg={!theme ? "darkThemeBg" : "white"}
    >
      <Flex justify="center" width={{ base: "100%", sm: "688px" }}>
        <Flex width={{ base: "90%", sm: "688px" }}>
          <GobackButton></GobackButton>
        </Flex>
      </Flex>

      <Card
        position="static"
        display="flex"
        flexDirection="row"
        borderRadius="8px"
        padding="0 24px"
        alignItems="center"
        color="darkThemeGrey"
        margin="32px auto 0 "
        height="95px"
        width={{ base: "90%", sm: "688px" }}
        bg={!theme ? "darkThemeInput" : "white"}
        justify="space-between"
      >
        <Text
          width="fit-content"
          fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
          color="darkThemeGrey"
          fontWeight="500"
          lineHeight="1.4"
        >
          Status
        </Text>

        <StatusBox
          width="fit-content"
          status={queriedInvoice.status}
          color={
            queriedInvoice.status === "Pending"
              ? "#FF8F00"
              : queriedInvoice.status === "Paid"
              ? "#33D69F"
              : "#DFE3FA"
          }
        ></StatusBox>
        <Flex
          position={{ base: "absolute", sm: "revert" }}
          bottom="-56px"
          left="0"
          width={{ base: "100%", sm: "initial" }}
          backgroundColor={!theme ? "darkThemeInput" : "white"}
          margin={{ base: "0 auto", sm: "0 0 0 auto" }}
          justify={{ base: "center", sm: "flex-end" }}
        >
          <ButtonGroup
            justifyContent="space-between"
            gap="8px"
            padding="21px 10px"
          >
            <FooterButton
              onClick={() => {
                navigate(`/invoices/edit/${invoiceId}`);
              }}
              color="#252945"
              hover={{ background: "#3b3e58", color: "white" }}
              text="Edit"
            ></FooterButton>
            <FooterButton
              hover={{ background: "#FF9797", color: "white" }}
              color="#EC5757"
              text="Delete"
              onClick={onOpen}
            ></FooterButton>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent background={!theme ? "darkThemeInput" : "#FFFFFF"}>
                <ModalHeader
                  color={!theme ? "darkThemeWhite" : "#0C0E16"}
                  fontSize="clamp(1.5rem, 0.9rem + 2vw, 1.6rem)"
                  fontWeight="700"
                  lineHeight="1.25"
                >
                  Confirm Deletion
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                  color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                  fontWeight="500"
                  lineHeight="1.4"
                >
                  Are you sure you want to delete invoice #{queriedInvoice.id}?
                  This action cannot be undone.
                </ModalBody>

                <ModalFooter gap={2}>
                  <FooterButton
                    hover={{ background: "#DFE3FA", color: "white" }}
                    onClick={onClose}
                    color="#252945"
                    text="Cancel"
                  ></FooterButton>
                  <FooterButton
                    hover={{ background: "#FF9797", color: "white" }}
                    onClick={async () => {
                      await deleteDoc(docRef);
                      navigate("/invoices");
                    }}
                    color="#EC5757"
                    text="Delete"
                  ></FooterButton>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <FooterButton
              hover={{
                background: "#9277FF",
                color: "white",
              }}
              onClick={() => {
                setDoc(docRef, { status: "Paid" }, { merge: true });
                navigate("/invoices");
              }}
              color="#7C5DFA"
              text="Mark as Paid"
            ></FooterButton>
          </ButtonGroup>
        </Flex>
      </Card>
      <Card
        position="static"
        display="flex"
        flexDirection="column"
        borderRadius="8px"
        padding={{ base: "24px 24px 0", sm: "32px 32px 0" }}
        alignItems="start"
        color="darkThemeGrey"
        margin="0 auto 82px"
        width={{ base: "90%", sm: "688px" }}
        bg={!theme ? "darkThemeInput" : "white"}
      >
        <Flex width="100%" direction="column" gap={6}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify={{ base: "initial", sm: "space-between" }}
            gap="30px"
            lineHeight={{ base: "1.25", sm: "1.5" }}
          >
            <Flex direction="column">
              <GridItem
                fontSize={{
                  base: "0.75rem",
                  sm: "1rem",
                }}
                lineHeight="1.25"
                letterSpacing="-0.25px"
                display="flex"
                justify="center"
                alignItems="center"
              >
                <Text color="hashColor">#</Text>
                <Text
                  color={!theme ? "darkThemeWhite" : "#0C0E16"}
                  fontWeight="700"
                >
                  {queriedInvoice.id}
                </Text>
              </GridItem>
              <Text
                fontSize={{
                  base: "0.75rem",
                  sm: "1rem",
                }}
                lineHeight="1.25"
                letterSpacing="-0.25px"
                color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                fontWeight="500"
              >
                {queriedInvoice.billTo.invoice.description}
              </Text>
            </Flex>
            <Flex
              textAlign={{ base: "revert", sm: "right" }}
              fontSize="0.6875rem"
              fontWeight="500"
              lineHeight="1.6"
              color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
              width={{ base: "60%", sm: "fit-content" }}
              direction="column"
              letterSpacing="-0.23px"
            >
              <Text>{queriedInvoice.billFrom.addressDetails.address}</Text>
              <Text>{queriedInvoice.billFrom.addressDetails.city}</Text>
              <Text>{queriedInvoice.billFrom.addressDetails.postCode}</Text>
              <Text>{queriedInvoice.billFrom.addressDetails.country}</Text>
            </Flex>
          </Flex>
          <Flex
            gap={{ base: "24px", sm: "90px" }}
            direction={{ base: "column", sm: "row" }}
          >
            <Grid
              fontSize="0.75rem"
              lineHeight="1.25"
              letterSpacing="-0.25px"
              columnGap={{ base: "24px", sm: "90px" }}
              rowGap={6}
              templateColumns={"repeat(2,1fr)"}
            >
              <GridItem colSpan={1}>
                <Text
                  marginBottom={{ base: "0px", sm: "12px" }}
                  fontWeight="500"
                  color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                >
                  Invoice Date
                </Text>
                <Text
                  fontSize="0.9375rem"
                  lineHeight="1.33"
                  letterSpacing="-0.31px"
                  color={!theme ? "darkThemeWhite" : "#0C0E16"}
                  fontWeight="700"
                >
                  {queriedInvoice.billTo.invoice.date}
                </Text>
              </GridItem>
              <GridItem rowStart={2}>
                <Text
                  marginBottom={{ base: "0px", sm: "12px" }}
                  color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                  fontWeight="500"
                >
                  Payment Due
                </Text>
                <Text
                  fontSize="0.9375rem"
                  lineHeight="1.33"
                  letterSpacing="-0.31px"
                  color={!theme ? "darkThemeWhite" : "#0C0E16"}
                  fontWeight="700"
                >
                  {queriedInvoice.billTo.invoice.paymentDue}
                </Text>
              </GridItem>
              <GridItem rowSpan={2}>
                <Text
                  marginBottom={{ base: "0px", sm: "12px" }}
                  color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                  fontWeight="500"
                >
                  Bill To
                </Text>
                <Text
                  fontSize="0.9375rem"
                  lineHeight="1.33"
                  letterSpacing="-0.31px"
                  color={!theme ? "darkThemeWhite" : "#0C0E16"}
                  fontWeight="700"
                  marginBottom={{ base: "8px", sm: "12px" }}
                >
                  {queriedInvoice.billTo.clientName}
                </Text>
                <Flex
                  fontSize="0.6875rem"
                  fontWeight="500"
                  lineHeight="1.6"
                  color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                  direction="column"
                >
                  <Text>{queriedInvoice.billTo.addressDetails.address}</Text>
                  <Text>{queriedInvoice.billTo.addressDetails.city}</Text>
                  <Text>{queriedInvoice.billTo.addressDetails.postCode}</Text>
                  <Text>{queriedInvoice.billTo.addressDetails.country}</Text>
                </Flex>
              </GridItem>
            </Grid>
            <Flex lineHeight="1.4" direction="column">
              <Text
                fontSize={{
                  base: "0.75rem",
                  sm: "1rem",
                }}
                lineHeight="1.25"
                letterSpacing="-0.25px"
                marginBottom={{ base: "8px", sm: "12px" }}
                color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                fontWeight="500"
                direction="column"
              >
                Sent to
              </Text>
              <Text
                fontSize="0.9375rem"
                lineHeight="1.33"
                letterSpacing="-0.31px"
                color={!theme ? "darkThemeWhite" : "#0C0E16"}
                fontWeight="700"
              >
                {queriedInvoice.billTo.clientEmail}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          margin="48px auto 32px"
          width={{ base: "73%", sm: "624px" }}
        >
          <Flex
            borderRadius="8px 8px 0 0"
            alignItems="start"
            color="darkThemeGrey"
            margin="0 auto"
            width="100%"
            padding="24px 24px"
            backgroundColor={!theme ? "rgba(37, 41, 69, 1)" : "#F9FAFE"}
          >
            <Grid width="100%" rowGap={8}>
              {width < 768 ? (
                ""
              ) : (
                <Flex
                  fontSize="0.75rem"
                  lineHeight="1.25"
                  letterSpacing="-0.25px"
                  align="center"
                  justify="space-between"
                >
                  <Text>Item Name</Text>
                  <Text>QTY.</Text>
                  <Text>Price</Text>
                  <Text>Total</Text>
                </Flex>
              )}
              {Object.keys(queriedInvoice.itemList.items).map((key, idx) => {
                if (width < 768)
                  return (
                    <GridItem key={idx}>
                      <Flex
                        fontSize="0.75rem"
                        lineHeight="1.25"
                        letterSpacing="-0.25px"
                        color="darkThemeWhite"
                        fontWeight="700"
                        align="center"
                        justify="space-between"
                      >
                        <Flex gap={2} direction="column">
                          <Text direction="column">{key}</Text>
                          <Text>
                            {queriedInvoice.itemList.items[key].qty} x £
                            {queriedInvoice.itemList.items[key].price}
                          </Text>
                        </Flex>
                        <Text direction="column">
                          £{queriedInvoice.itemList.items[key].total}
                        </Text>
                      </Flex>
                    </GridItem>
                  );
                return (
                  <GridItem key={idx}>
                    <Flex
                      color={!theme ? "darkThemeWhite" : "#7E88C3"}
                      fontSize="0.75rem"
                      lineHeight="1.25"
                      fontWeight="700"
                      letterSpacing="-0.25px"
                      align="center"
                      justify="space-between"
                    >
                      <Text color={!theme ? "darkThemeWhite" : "#0C0E16"}>
                        {key}
                      </Text>
                      <Text>{queriedInvoice.itemList.items[key].qty}</Text>
                      <Text>{queriedInvoice.itemList.items[key].price}</Text>
                      <Text color={!theme ? "darkThemeWhite" : "#0C0E16"}>
                        £ {queriedInvoice.itemList.items[key].total}
                      </Text>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </Flex>
          <Flex
            width="100%"
            borderRadius="0 0 8px 8px"
            padding="24px"
            height="80px"
            marginBottom={6}
            backgroundColor="rgba(12, 14, 22, 1)"
          >
            <Flex width="100%" align="center" justify="space-between">
              <Text
                fontSize="11px"
                color={!theme ? "darkThemeGreyWhite" : "#7E88C3"}
                fontWeight="500"
                lineHeight="1.636"
              >
                Amount Due
              </Text>
              <Text
                fontSize="1.25rem"
                color="darkThemeWhite"
                fontWeight="700"
                lineHeight="1.6"
              >
                £{queriedInvoice.itemList.grandTotal}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default ViewInvoice;
