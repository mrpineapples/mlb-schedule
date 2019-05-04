import React from 'react';
import SummaryHeader from './SummaryHeader';

const SeriesType = props => {
  let series = props.round

  if (series.includes("LDS")) {
    series = series.split(" ")[0]
  } else if (series.includes("WC")) {
    series = series.replace("WC", " Wild Card")
  } else if (series.includes("LTB")) {
    series = series.split("T")[0] + " Tiebreaker"
  } else if (series === "WS") {
    series = "World Series"
  }

  return (
    <SummaryHeader>{series}</SummaryHeader>
  )
}

export default SeriesType;