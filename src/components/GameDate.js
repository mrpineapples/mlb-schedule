import React from 'react';
import styled from "styled-components";

const GameDay = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0 1rem;
  padding-bottom: .5rem;
  border-bottom: solid 1px #ccc;
`

const GameDate = props => {

  const gameDate = new Date(`${props.date} EDT`)
  const options = { weekday: 'long', month: "short", day: 'numeric' };
  const gameDateString = gameDate.toLocaleDateString("default", options)

  return <GameDay>{gameDateString}</GameDay>
}

export default GameDate;