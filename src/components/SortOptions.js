import React from "react";
import styled from "styled-components";
import SortButton from "./SortButton";

const ButtonGroup = styled.div`
  margin: 1rem auto;
  text-align: center;
`

const SortOptions = props => {
  return (
    <React.Fragment>
      <ButtonGroup>
        <SortButton 
          active={props.isDateActive}
          onClick={props.dateClick}
          >
          By Date
        </SortButton>
        <SortButton 
          active={props.isRoundActive}
          onClick={props.roundClick}
          >
          By Round
        </SortButton>
      </ButtonGroup>
    </React.Fragment>
  )
}

export default SortOptions;