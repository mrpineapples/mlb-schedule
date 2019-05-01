import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  margin: .5rem 1rem 1rem 1rem;
`

const Status = styled.span`
  color: #666;
  font-size: .8rem;
  font-weight: 600;
`

const Summary = styled.div`
  display: grid;
  grid-template-columns: 1.5fr .5fr .5fr 2fr 1.5fr;
  width: 100%;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;

  & a {
    color: inherit;
    text-decoration: none;
    cursor: pointer; 
  }
  
  & .away:hover {
    color: #147cd1;
  }

  & .home:hover {
    color: #147cd1;
  }

  & .status a:hover {
    color: #147cd1;
  }

  & .pitchers span {
    margin-right: .5rem;
  }

  & .pitchers span a {
    color: #147cd1;
    text-decoration: none
  }

  & .button {
    text-align: right;
    padding-right: .5rem;
  }
`

const GameSummary = props => {
  return (
    <Wrapper>
      <Status>{props.seriesStatus}</Status>
      <Summary>
        <div className="teams">
          <a 
            href={`https://www.mlb.com/${props.awayTeam.toLowerCase().replace(/\s/g, "")}`} 
            target="_blank" 
            className="away"
            >
            {`${props.awayTeam} ${props.awayScore}`}
          </a>
          <span> @ </span>
          <a 
            href={`https://www.mlb.com/${props.homeTeam.toLowerCase().replace(/\s/g, "")}`} 
            target="_blank" 
            className="home"
            >
            {`${props.homeTeam} ${props.homeScore}`}
          </a>
        </div>
        
        <div className="status">
          <a href={`https://www.mlb.com/gameday/${props.gameId}`} target="_blank"> {props.final}</a>
        </div>

        <div className="tv">
          <span> {props.broadcast}</span>
        </div>
        
        <div className="pitchers">
          <span> W: <a href={`https://www.mlb.com/player/${props.winnerUrl}`} target="_blank">{props.winningPitcher}</a></span>
          <span> L: <a href={`https://www.mlb.com/player/${props.loserUrl}`} target="_blank">{props.losingPitcher}</a></span>
          {props.savePitcher ? <span> SV: <a href={`https://www.mlb.com/player/${props.saveUrl}`} target="_blank">{props.savePitcher}</a></span> : null}
        </div>

        <div className="button">
          <span id="wrapup"> WRAP</span>
          <span id="video"> VIDEO</span>
        </div>
        
      </Summary>
    </Wrapper>
  );
}

export default GameSummary;
