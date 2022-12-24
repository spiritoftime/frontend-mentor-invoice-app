import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, collection } from "firebase/firestore";
import { database } from "../../firestore";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../redux-store/invoice-slice";
import convertSecondsToDate from "../helper-functions/convertSecondsToDate";
import { ButtonGroup, Text, Flex } from "@chakra-ui/react";
import StatusBox from "../UI/StatusBox";
import GobackButton from "../UI/GobackButton";
import FooterButton from "../UI/FooterButton";
import { useNavigate } from "react-router-dom";
const ViewInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoiceId } = useParams();
  const uid = useSelector((state) => state.Login.uid);
  useEffect(() => {
    const queryData = async () => {
      // const queryData = () => {
      const docRef = doc(database, "users", uid, "invoices", invoiceId);
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
          color="#FF8F00"
        ></StatusBox>
        <Flex>
          <ButtonGroup
            justifyContent="space-between"
            gap="8px"
            padding="21px 10px"
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            backgroundColor="darkThemeInput"
          >
            <FooterButton
              onClick={() => {
                navigate(`/invoices/edit/${invoiceId}`);
              }}
              color="#252945"
              text="Edit"
            ></FooterButton>
            <FooterButton color="#EC5757" text="Delete"></FooterButton>
            <FooterButton color="#7C5DFA" text="Mark as Paid"></FooterButton>
          </ButtonGroup>
        </Flex>
      </Flex>
      <Flex
        borderRadius="8px"
        padding="0 24px"
        alignItems="center"
        color="darkThemeGrey"
        margin="0 auto"
        width="90%"
        bg="darkThemeInput"
        justify="space-between"
      >
        HiQ
      </Flex>
    </Flex>
  );
};

export default ViewInvoice;
