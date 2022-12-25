const convertDateToInputDate = (date) => {
  const dateArr = date.split("/");
  dateArr.reverse();
  const month = dateArr.at(-1);
  const day = dateArr[1];
  dateArr[2] = day;
  dateArr[1] = month;
  return dateArr.join("-");
};
export default convertDateToInputDate;
