const createItemsObj = (queriedInvoice) => {
  return Object.entries(queriedInvoice.itemList.items).map(
    ([key, value], idx) => {
      return { [key]: value };
    }
  );
};

export default createItemsObj;
