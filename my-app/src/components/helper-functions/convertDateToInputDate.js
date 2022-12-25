const convertDateToInputDate = (date) => {
  const [month, day, year] = date.split("/");
  return [year, month, day].join("-");
};
export default convertDateToInputDate;
