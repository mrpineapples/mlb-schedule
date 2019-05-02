import React, { Component } from "react";
import styled from "styled-components";
import SortButton from "./SortButton";

const ButtonGroup = styled.div`
  margin: 1rem auto;
  text-align: center;
`

class SortOptions extends Component {
  state = {
    dateActive: true,
    roundActive: false
  }

  sortByDate = () => {
    this.setState({
      dateActive: true,
      roundActive: false
    })
  }

  sortByRound = () => {
    this.setState({
      roundActive: true,
      dateActive: false
    })
  }


  render() {
    return (
      <React.Fragment>
        <ButtonGroup>
          <SortButton 
            active={this.state.dateActive}
            onClick={this.sortByDate}
            >
            By Date
          </SortButton>
          <SortButton 
            active={this.state.roundActive}
            onClick={this.sortByRound}
            >
            By Round
          </SortButton>
        </ButtonGroup>
      </React.Fragment>
    )
  }
}

export default SortOptions;