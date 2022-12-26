const convertDateToInputDate = (date) => {
  const [day, month, year] = date.split("/");
  return [year, month, day].join("-");
};
export default convertDateToInputDate;
