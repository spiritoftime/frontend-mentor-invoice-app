import { Timestamp } from "firebase/firestore";
const calculatePaymentDue = (date, paymentTerms) => {
  const dateObj = new Date(date);
  switch (paymentTerms) {
    case "Net 30 Days":
      return Timestamp.fromDate(
        new Date(dateObj.setDate(dateObj.getDate() + 30))
      );

    case "Net 60 Days":
      return Timestamp.fromDate(
        new Date(dateObj.setDate(dateObj.getDate() + 60))
      );

    case "Net 90 Days":
      return Timestamp.fromDate(
        new Date(dateObj.setDate(dateObj.getDate() + 90))
      );
    default:
      return;
  }
};
const calculateTotal = (formData) => {
  return Object.keys(formData).reduce((sum, key) => {
    if (key.includes("item")) {
      sum += +formData[key]["total"];
    }
    return sum;
  }, 0);
};
export const createInvoiceObj = (formData) => {
  const grandTotal = calculateTotal(formData);
  let invoiceObj = {
    id: "abc123",
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
    itemList: {
      grandTotal: grandTotal,
      items: {},
    },
  };
  // add items into the obj
  for (let [key, value] of Object.entries(formData)) {
    if (key.includes("item")) {
      invoiceObj.itemList.items[value.itemName] = {
        qty: +value.qty,
        price: +value.price,
        total: +value.total,
      };
    }
  }
  return invoiceObj;
};
