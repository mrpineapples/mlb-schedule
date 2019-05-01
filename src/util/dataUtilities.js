export const formatDate = date => {
  // convert date using new Date in case the date is not given in the right format
  const dateConverted = new Date(date)
  const dateOptions = { weekday: 'long', month: "short", day: 'numeric' };
  const newDate = dateConverted.toLocaleDateString("default", dateOptions)
  return newDate
}