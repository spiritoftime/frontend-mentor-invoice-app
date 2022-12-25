const convertSecondsToDate = (seconds) => {
  const curdate = new Date(null);
  // setTime takes in ms and returns ms
  curdate.setTime(seconds * 1000);
  const date = curdate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(",")[0];
  return date;
};

export default convertSecondsToDate;
