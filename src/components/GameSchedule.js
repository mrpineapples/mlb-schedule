import React, { useState, useEffect } from 'react';
import GameSummary from './GameSummary';
import GameDate from './GameDate';
import SeriesType from './SeriesType';
import DataTransformer from "../lib/DataTransformer";

const GameSchedule = props => {
  const url = `https://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=${props.year}&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)`
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(jsonData => {
        let cleanedData = DataTransformer.cleanMlbData(jsonData)
        let rounds = DataTransformer.createRoundsList(cleanedData)
        let games = DataTransformer.createGamesList(cleanedData)
        let gameDates = DataTransformer.createGameDates(cleanedData)
        
        return setData({
          rounds: rounds,
          games: games,
          gameDates: gameDates,
        })
      })
      .catch(err => console.log(err));
  }, [url])

  if (!data) {
    return null
  }

  const games = data.games;
  const rounds = data.rounds;
  const gameDates = data.gameDates;

  let summaries = games.map((game, i) => 
    <GameSummary
      sortBy={props.sort}
      key={`${game.gamePk}_${i}`}
      gameId={game.gamePk}
      seriesStatus={game.seriesStatus}
      round={game.seriesId}
      linescore={game.linescore}
      date={game.gameDate}
      broadcast={game.broadcasts}
      awayTeamData={game.awayTeam}
      homeTeamData={game.homeTeam}
      pitcherDecisions={game.pitchers}
    />
  )
  
  let schedule = gameDates.map(date => (
      <React.Fragment key={date}>
        <GameDate date={date} />
        {summaries.filter(summary => summary.props.date === date)}
      </React.Fragment>
    )
  )

  if (props.sort === "round") {
    schedule = rounds.map(round => (
      <React.Fragment key={round}>
        <SeriesType round={round} />
        {summaries.filter(summary => summary.props.round === round)}
      </React.Fragment>
    ))
  }

  return schedule;
}

export default GameSchedule;
