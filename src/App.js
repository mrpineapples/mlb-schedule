import React, { Component } from "react"
import GameSchedule from "./components/GameSchedule";
import SortOptions from "./components/SortOptions";

class App extends Component {
  render() {
    return ( 
      <React.Fragment>
        <SortOptions />
        <GameSchedule />
      </React.Fragment>
    )
  }
}

export default App;