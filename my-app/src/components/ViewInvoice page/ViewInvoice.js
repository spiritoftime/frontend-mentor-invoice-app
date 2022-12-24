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
      // const queryData = () => {
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
        borderRadius="8px"
        padding="0 24px"
        alignItems="start"
        color="darkThemeGrey"
        margin="0 auto 82px"
        width="90%"
        bg="darkThemeInput"
      >
        <Flex direction="column" gap={6}>
          <Flex direction="column">
            <Flex direction="column">
              <Text>#XM9141</Text>
              <Text>Graphic Design</Text>
            </Flex>
            <Flex direction="column">
              <Text>19 Union Terrace</Text>
              <Text>London</Text>
              <Text>E1 3EZ</Text>
              <Text>United Kingdom</Text>
            </Flex>
          </Flex>
          <Flex gap={6} direction="column">
            <Grid columnGap={6} rowGap={6} templateColumns={"repeat(2,1fr)"}>
              <GridItem colSpan={1}>
                <Text>Invoice Date</Text>
                <Text>21 Aug 2021</Text>
              </GridItem>
              <GridItem rowStart={2}>
                <Text>Payment Due</Text>
                <Text>20 Sep 2021</Text>
              </GridItem>
              <GridItem rowSpan={2}>
                <Text>Bill To</Text>
                <Text>Alex Grim</Text>
                <Text>84 Church Way</Text>
                <Text>Bradford</Text>
                <Text>BD1 9PB</Text>
                <Text>United Kingdom</Text>
              </GridItem>
            </Grid>
            <Flex direction="column">
              <Text>Sent to</Text>
              <Text>alexgrim@mail.com</Text>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            borderRadius="8px"
            alignItems="start"
            color="darkThemeGrey"
            margin="0 auto"
            backgroundColor="rgba(37, 41, 69, 1)"
          >
            <Grid>
              <GridItem>iudakaqedaadsdasdasdasdasadc</GridItem>
              <GridItem>iudakaqedaadsdasdasdasdasadc</GridItem>
              <GridItem>iudakaqedaadsdasdasdasdasadc</GridItem>
              <GridItem>iudakaqedaadsdasdasdasdasadc</GridItem>
              <GridItem>iudakaqedaadsdasdasdasdasadc</GridItem>
              <GridItem>iudakaqedaadsdasdasdasdasadc</GridItem>
              <GridItem>iudakaqedaadsdasdasdasdasadc</GridItem>
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewInvoice;
