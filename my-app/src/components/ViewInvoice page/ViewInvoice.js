import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { database } from "../../firestore";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../redux-store/invoice-slice";
import convertSecondsToDate from "../helper-functions/convertSecondsToDate";
import { ButtonGroup, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import StatusBox from "../UI/StatusBox";
import GobackButton from "../UI/GobackButton";
import FooterButton from "../UI/FooterButton";
import { useNavigate } from "react-router-dom";
const ViewInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoiceId } = useParams();
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
      alignItems="flex-start"
      gap="6px"
      direction="column"
      minBlockSize="100vh"
      bg="darkThemeBg"
    >
      <GobackButton ml="5%"></GobackButton>
      <Flex
        borderRadius="8px"
        padding="0 24px"
        alignItems="center"
        color="darkThemeGrey"
        margin="32px auto 0 "
        height="95px"
        width="90%"
        bg="darkThemeInput"
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
          color={queriedInvoice.status === "Pending" ? "#FF8F00" : "#33D69F"}
        ></StatusBox>
        <Flex
          position="absolute"
          bottom="-56px"
          left="0"
          width="100%"
          backgroundColor="darkThemeInput"
          margin="0 auto"
          justify="center"
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
              text="Edit"
            ></FooterButton>
            <FooterButton color="#EC5757" text="Delete"></FooterButton>
            <FooterButton
              onClick={() => {
                setDoc(docRef, { status: "Paid" }, { merge: true });
              }}
              color="#7C5DFA"
              text="Mark as Paid"
            ></FooterButton>
          </ButtonGroup>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        borderRadius="8px 8px 0 0"
        padding="24px 24px 0"
        alignItems="start"
        color="darkThemeGrey"
        margin="0 auto 82px"
        width="90%"
        bg="darkThemeInput"
      >
        <Flex width="100%" direction="column" gap={6}>
          <Flex direction="column" gap="30px">
            <Flex direction="column">
              <GridItem
                fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                display="flex"
                justify="center"
                alignItems="center"
              >
                <Text color="hashColor">#</Text>
                <Text color="darkThemeWhite" fontWeight="700" lineHeight="1.4">
                  {queriedInvoice.id}
                </Text>
              </GridItem>
              <Text
                fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                color="darkThemeGreyWhite"
                fontWeight="500"
                lineHeight="1.4"
              >
                {queriedInvoice.billTo.invoice.description}
              </Text>
            </Flex>
            <Flex
              fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
              color="darkThemeGreyWhite"
              fontWeight="500"
              width="60%"
              lineHeight="1.4"
              direction="column"
            >
              <Text>{queriedInvoice.billFrom.addressDetails.address}</Text>
              <Text>{queriedInvoice.billFrom.addressDetails.city}</Text>
              <Text>{queriedInvoice.billFrom.addressDetails.postCode}</Text>
              <Text>{queriedInvoice.billFrom.addressDetails.country}</Text>
            </Flex>
          </Flex>
          <Flex gap={6} direction="column">
            <Grid columnGap={6} rowGap={6} templateColumns={"repeat(2,1fr)"}>
              <GridItem colSpan={1}>
                <Text
                  fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                  color="darkThemeGreyWhite"
                  fontWeight="500"
                  lineHeight="1.4"
                >
                  Invoice Date
                </Text>
                <Text
                  fontSize="clamp(0.95rem, 0.5rem + 2vw, 2.4rem)"
                  color="darkThemeWhite"
                  fontWeight="700"
                  lineHeight="1.4"
                >
                  {queriedInvoice.billTo.invoice.date}
                </Text>
              </GridItem>
              <GridItem rowStart={2}>
                <Text
                  fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                  color="darkThemeGreyWhite"
                  fontWeight="500"
                  lineHeight="1.4"
                >
                  Payment Due
                </Text>
                <Text
                  fontSize="clamp(0.95rem, 0.5rem + 2vw, 2.4rem)"
                  color="darkThemeWhite"
                  fontWeight="700"
                  lineHeight="1.4"
                >
                  {queriedInvoice.billTo.invoice.paymentDue}
                </Text>
              </GridItem>
              <GridItem rowSpan={2}>
                <Text
                  fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                  color="darkThemeGreyWhite"
                  fontWeight="500"
                  lineHeight="1.4"
                >
                  Bill To
                </Text>
                <Text
                  fontSize="clamp(0.95rem, 0.5rem + 2vw, 2.4rem)"
                  color="darkThemeWhite"
                  fontWeight="700"
                  lineHeight="1.4"
                  marginBottom="8px"
                >
                  {queriedInvoice.billTo.clientName}
                </Text>
                <Flex
                  fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                  color="darkThemeGreyWhite"
                  fontWeight="500"
                  lineHeight="1.4"
                  direction="column"
                >
                  <Text>{queriedInvoice.billTo.addressDetails.address}</Text>
                  <Text>{queriedInvoice.billTo.addressDetails.city}</Text>
                  <Text>{queriedInvoice.billTo.addressDetails.postCode}</Text>
                  <Text>{queriedInvoice.billTo.addressDetails.country}</Text>
                </Flex>
              </GridItem>
            </Grid>
            <Flex direction="column">
              <Text
                fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                color="darkThemeGreyWhite"
                fontWeight="500"
                lineHeight="1.4"
                direction="column"
              >
                Sent to
              </Text>
              <Text
                fontSize="clamp(0.95rem, 0.5rem + 2vw, 2.4rem)"
                color="darkThemeWhite"
                fontWeight="700"
                lineHeight="1.4"
              >
                {queriedInvoice.billTo.clientEmail}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            borderRadius="8px 8px 0 0 "
            alignItems="start"
            color="darkThemeGrey"
            margin="0 auto"
            width="100%"
            padding="24px 24px"
            backgroundColor="rgba(37, 41, 69, 1)"
          >
            <Grid width="100%" rowGap={6}>
              {Object.keys(queriedInvoice.itemList.items).map((key) => {
                return (
                  <GridItem>
                    <Flex align="center" justify="space-between">
                      <Flex direction="column">
                        <Text
                          fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                          color="darkThemeWhite"
                          fontWeight="700"
                          lineHeight="1.4"
                          direction="column"
                        >
                          {key}
                        </Text>
                        <Text
                          fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                          color="darkThemeGreyWhite"
                          fontWeight="700"
                          lineHeight="1.4"
                          direction="column"
                        >
                          {queriedInvoice.itemList.items[key].qty} x £
                          {queriedInvoice.itemList.items[key].price}
                        </Text>
                      </Flex>
                      <Text
                        fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
                        color="darkThemeWhite"
                        fontWeight="700"
                        lineHeight="1.4"
                        direction="column"
                      >
                        £{queriedInvoice.itemList.items[key].total}
                      </Text>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
          </Flex>
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
              fontSize="clamp(0.65rem, 0.4rem + 2vw, 1.6rem)"
              color="darkThemeGreyWhite"
              fontWeight="500"
              lineHeight="1.4"
            >
              Amount Due
            </Text>
            <Text
              fontSize="clamp(1.05rem, 0.7rem + 2vw, 3rem)"
              color="darkThemeWhite"
              fontWeight="700"
              lineHeight="1.6"
            >
              £{queriedInvoice.itemList.grandTotal}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewInvoice;
