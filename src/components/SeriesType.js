import React from 'react';
import styled from "styled-components";

const Header = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 1.5rem 1rem 0 1rem;
  padding-bottom: .5rem;
`

const SeriesType = props => {
  let series = props.round

  if (props.round === "Regular Season") {
    series = "Tiebreakers"
  }

  return (
    <Header>{series}</Header>
  )
}

export default SeriesType;