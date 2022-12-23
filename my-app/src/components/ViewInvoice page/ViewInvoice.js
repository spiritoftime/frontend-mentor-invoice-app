import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, collection } from "firebase/firestore";
import { database } from "../../firestore";
import { useSelector, useDispatch } from "react-redux";
import { invoiceActions } from "../../redux-store/invoice-slice";
import convertSecondsToDate from "../helper-functions/convertSecondsToDate";
const ViewInvoice = () => {
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
      console.log(docData);
      dispatch(invoiceActions.queryInvoice(docData));
    };
    queryData();
  }, []);
  const { queriedInvoice } = useSelector((state) => state.invoice);

  return <div>Hello!</div>;
};

export default ViewInvoice;
