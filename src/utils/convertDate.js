const convertDate = (date) => {
  // Local to Mongo DB compatible ISO

  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();
};

export default convertDate;
