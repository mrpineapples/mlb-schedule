import React from 'react';
import styled from "styled-components";
import broadcastImage from "../util/broadcastImage";
import teamNameToLogo from '../util/teamNameToLogo';

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
  #amp {
    font-size: .9rem;
    margin-right: .25rem;
  }

  & a {
    color: inherit;
    text-decoration: none;
    cursor: pointer; 
  }

  & .teams img {
    vertical-align: middle;
    margin-right: .5rem;
    margin-bottom: .2rem;
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

const removeSpaceAndLower = name => {
  return name.toLowerCase().replace(/\s/g, "")
}

const GameSummary = props => {
  // Only used when sorting by round
  const gameMonthAndDate = props.date.split(",")[1]

  const seriesStatus = `${props.seriesStatus.shortDescription} - ${props.seriesStatus.result}`;
  const awayTeam = props.awayTeamData.team.teamName;
  const awayTeamLogo = teamNameToLogo(removeSpaceAndLower(awayTeam));
  const awayScore = props.awayTeamData.score;
  const homeTeam = props.homeTeamData.team.teamName;
  const homeTeamLogo = teamNameToLogo(removeSpaceAndLower(homeTeam));
  const homeScore = props.homeTeamData.score;
  const gameFinal = props.linescore.scheduledInnings !== props.linescore.currentInning ? `F/${props.linescore.currentInning}`: "FINAL";
  const broadcast = broadcastImage(props.broadcast.find(obj => obj.isNational).callSign);
  const winningPitcher = props.pitcherDecisions.winningPitcher;
  const winnerUrlSlug = props.pitcherDecisions.winnerUrlSlug;
  const losingPitcher = props.pitcherDecisions.losingPitcher;
  const loserUrlSlug = props.pitcherDecisions.loserUrlSlug;
  const savePitcher =  props.pitcherDecisions.savePitcher;
  const saveUrlSlug =  props.pitcherDecisions.saveUrlSlug;
  const baseUrl = `https://www.mlb.com`;
  const awayTeamUrl = `${baseUrl}/${removeSpaceAndLower(awayTeam)}`;
  const homeTeamUrl = `${baseUrl}/${removeSpaceAndLower(homeTeam)}`;
  

  return (
    <Wrapper>
      <Status>{seriesStatus}</Status>
      <Summary>
        <div className="teams">
          {props.sortBy === "round" ? <StyledDate>{gameMonthAndDate}</StyledDate> : null}
          <a 
            href={awayTeamUrl} 
            target="_blank" 
            className="away"
            rel="noopener noreferrer"
            >
            {awayTeamLogo}
            {`${awayTeam} ${awayScore}`}
          </a>
          <span id="amp"> @ </span>
          <a 
            href={homeTeamUrl} 
            target="_blank" 
            className="home"
            rel="noopener noreferrer"
            >
            {homeTeamLogo}
            {`${homeTeam} ${homeScore}`}
          </a>
        </div>
        
        <div className="status">
          <a 
            href={`${baseUrl}/gameday/${props.gameId}`} 
            target="_blank"
            rel="noopener noreferrer"
            > 
            {gameFinal}
          </a>
        </div>

        <div className="tv">
          {broadcast}
        </div>
        
        <div className="pitchers">
          <span> W: <a href={`${baseUrl}/player/${winnerUrlSlug}`} target="_blank" rel="noopener noreferrer">{winningPitcher}</a></span>
          <span> L: <a href={`${baseUrl}/player/${loserUrlSlug}`} target="_blank" rel="noopener noreferrer">{losingPitcher}</a></span>
          {savePitcher ? <span> SV: <a href={`${baseUrl}/player/${saveUrlSlug}`} target="_blank" rel="noopener noreferrer">{savePitcher}</a></span> : null}
        </div>

        <div className="button">

          <a 
            href={`${baseUrl}/gameday/${props.gameId}/final/wrap`} 
            target="_blank" 
            id="wrapup"
            rel="noopener noreferrer"
            >
            WRAP
          </a>

          <a 
            href={`${baseUrl}/gameday/${props.gameId}/final/video`} 
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
