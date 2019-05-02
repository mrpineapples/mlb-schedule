import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0rem 1rem 0rem 1rem;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding-top: .2rem;
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
  padding: .2rem 0 1rem 0;

  /* consider making new styled component for anchor tags, DRY */
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

  & .button a:hover {
    color: #555;
  }

  & .button > * {
    padding-left: .5rem;
  }
`

const StyledDate = styled.div`
  display: inline-block;
  width: 5rem;
`

const GameSummary = props => {
  const gameDate = new Date(`${props.date} EDT`)
  const options = { month: "short", day: 'numeric' };
  const gameDateString = gameDate.toLocaleDateString("default", options)

  return (
    <Wrapper>
      <Status>{props.seriesStatus}</Status>
      <Summary>
        <div className="teams">
          {props.sortBy === "round" ? <StyledDate>{gameDateString}</StyledDate> : null}
          <a 
            href={`https://www.mlb.com/${props.awayTeam.toLowerCase().replace(/\s/g, "")}`} 
            target="_blank" 
            className="away"
            rel="noopener noreferrer"
            >
            {`${props.awayTeam} ${props.awayScore}`}
          </a>
          <span> @ </span>
          <a 
            href={`https://www.mlb.com/${props.homeTeam.toLowerCase().replace(/\s/g, "")}`} 
            target="_blank" 
            className="home"
            rel="noopener noreferrer"
            >
            {`${props.homeTeam} ${props.homeScore}`}
          </a>
        </div>
        
        <div className="status">
          <a 
            href={`https://www.mlb.com/gameday/${props.gameId}`} 
            target="_blank"
            rel="noopener noreferrer"
            > 
            {props.final}
          </a>
        </div>

        <div className="tv">
          <span>{props.broadcast}</span>
        </div>
        
        <div className="pitchers">
          <span> W: <a href={`https://www.mlb.com/player/${props.winnerUrlSlug}`} target="_blank" rel="noopener noreferrer">{props.winningPitcher}</a></span>
          <span> L: <a href={`https://www.mlb.com/player/${props.loserUrlSlug}`} target="_blank" rel="noopener noreferrer">{props.losingPitcher}</a></span>
          {props.savePitcher ? <span> SV: <a href={`https://www.mlb.com/player/${props.saveUrlSlug}`} target="_blank" rel="noopener noreferrer">{props.savePitcher}</a></span> : null}
        </div>

        <div className="button">

          <a 
            href={`https://www.mlb.com/gameday/${props.gameId}/final/wrap`} 
            target="_blank" 
            id="wrapup"
            rel="noopener noreferrer"
            >
            WRAP
          </a>

          <a 
            href={`https://www.mlb.com/gameday/${props.gameId}/final/video`} 
            target="_blank" 
            id="video"
            rel="noopener noreferrer"
            > 
            VIDEO
          </a>

        </div>
      </Summary>
    </Wrapper>
  );
}

export default GameSummary;
