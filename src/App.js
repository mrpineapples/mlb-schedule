import React, { Component } from "react"
import GameSchedule from "./components/GameSchedule";
import SortOptions from "./components/SortOptions";

class App extends Component {
  state = {
    dateActive: true,
    roundActive: false,
    sortOption: "date"
  }

  sortByDate = () => {
    this.setState({
      dateActive: true,
      roundActive: false,
      sortOption: "date"
    })
  }

  sortByRound = () => {
    this.setState({
      roundActive: true,
      dateActive: false,
      sortOption: "round"
    })
  }

  render() {
    return ( 
      <React.Fragment>
        <SortOptions 
          isDateActive={this.state.dateActive}
          isRoundActive={this.state.roundActive}
          dateClick={this.sortByDate}
          roundClick={this.sortByRound} />
        <GameSchedule sort={this.state.sortOption} />
      </React.Fragment>
    )
  }
}

export default App;