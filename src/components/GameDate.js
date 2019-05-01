import React from 'react';
import styled from "styled-components";

const GameDay = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 1.5rem 1rem 0 1rem;
  padding-bottom: .5rem;
`

const GameDate = props => {
  return <GameDay>{props.date}</GameDay>
}

export default GameDate;