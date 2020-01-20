import React, { useState } from "react";
import GameSchedule from "./components/GameSchedule";
import SortOptions from "./components/SortOptions";
import SectionTitle from "./components/SectionTitle";
import YearInput from "./components/YearSelect";

const App = props => {
  const [dateActive, setDateActive] = useState(true);
  const [roundActive, setRoundActive] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [year, setYear] = useState("2018")

  const sortByDate = () => {
    setDateActive(true);
    setRoundActive(false);
    setSortOption("date");
  }

  const sortByRound = () => {
    setDateActive(false);
    setRoundActive(true);
    setSortOption("round");
  }

  const yearChangeHandler = (e) => {
    setYear(e.target.value)
  }
  
  return ( 
    <React.Fragment>
      <SectionTitle>Schedule</SectionTitle>
      <YearInput year={year} yearChangeHandler={yearChangeHandler} />
      <SortOptions 
        isDateActive={dateActive}
        isRoundActive={roundActive}
        dateClick={sortByDate}
        roundClick={sortByRound} />
      <GameSchedule year={year} sort={sortOption} />
    </React.Fragment>
  )
}

export default App;