import React, { useState } from "react";
import GameSchedule from "./components/GameSchedule";
import SortOptions from "./components/SortOptions";
import SectionTitle from "./components/SectionTitle";

const App = props => {
  const [dateActive, setDateActive] = useState(true);
  const [roundActive, setRoundActive] = useState(false);
  const [sortOption, setSortOption] = useState("date");

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
  
  return ( 
    <React.Fragment>
      <SectionTitle>Schedule</SectionTitle>
      <SortOptions 
        isDateActive={dateActive}
        isRoundActive={roundActive}
        dateClick={sortByDate}
        roundClick={sortByRound} />
      <GameSchedule sort={sortOption} />
    </React.Fragment>
  )
}

export default App;