import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { createInvoiceObj } from "../helper-functions/createInvoiceObj";

const docToAction = ({ invoiceObj = "", crudType }) => {};

export default docToAction;
