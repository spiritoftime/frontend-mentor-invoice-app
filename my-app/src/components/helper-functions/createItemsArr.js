const createItemsArr = (queriedInvoice) => {
  return Object.entries(queriedInvoice.itemList.items).map(
    ([key, value], idx) => {
      const itemNumber = `item ${idx + 1}`;

      return {
        [itemNumber]: {
          itemName: key,
          qty: value.qty,
          price: value.price,
          total: value.total,
        },
      };
    }
  );
};

export default createItemsArr;
