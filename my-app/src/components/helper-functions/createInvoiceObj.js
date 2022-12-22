import { doc, setDoc, Timestamp } from "firebase/firestore";
const calculatePaymentDue = (date, paymentTerms) => {
  const dateObj = new Date(date);
  switch (paymentTerms) {
    case "Net 30 Days":
      return Timestamp.fromDate(new Date(date.setDate(date.getDate() + 30)));

    case "Net 60 Days":
      return Timestamp.fromDate(new Date(date.setDate(date.getDate() + 60)));

    case "Net 90 Days":
      return Timestamp.fromDate(new Date(date.setDate(date.getDate() + 90)));
    default:
      return;
  }
};
const createInvoiceObj = (formData) => {
  console.log(Timestamp.fromDate(new Date(formData.date)));
  let invoiceObj = {
    billFrom: {
      addressDetails: {
        address: formData.address,
        city: formData.city,
        postCode: formData.postCode,
        country: formData.country,
      },
    },
    status: "Pending",
    billTo: {
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      addressDetails: {
        address: formData.billToAddress,
        city: formData.billToCity,
        country: formData.billToCountry,
        postCode: formData.billToPostCode,
      },
      invoice: {
        date: Timestamp.fromDate(new Date(formData.date)),
        paymentTerms: formData.paymentTerms,
        paymentDue: calculatePaymentDue(formData.date, formData.paymentTerms),
        description: formData.description,
      },
    },
  };
  // add items into the obj
};

export default createInvoiceObj;
