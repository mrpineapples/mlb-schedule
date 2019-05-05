import React, { Component } from 'react';
import GameSummary from './GameSummary';
import GameDate from './GameDate';
import SeriesType from './SeriesType';
import DataTransformer from "../lib/DataTransformer";

const url = "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"

class GameSchedule extends Component {
  state = {
    data: null
  }

  componentDidMount() {    
    fetch(url)
      .then(res => res.json())
      .then(jsonData => {
        let cleanedData = DataTransformer.cleanMlbData(jsonData)
        let rounds = DataTransformer.createRoundsList(cleanedData)
        let games = DataTransformer.createGamesList(cleanedData)
        let gameDates = DataTransformer.createGameDates(cleanedData)
        
        return this.setState({
          data: {
            rounds: rounds,
            games: games,
            gameDates: gameDates,
          }
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.data) {
      return null
    }

    const games = this.state.data.games
    const rounds = this.state.data.rounds
    const gameDates = this.state.data.gameDates

    let summaries = games.map(game => 
      <GameSummary
        sortBy={this.props.sort}
        key={game.gamePk}
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

    if (this.props.sort === "round") {
      schedule = rounds.map(round => (
        <React.Fragment key={round}>
          <SeriesType round={round} />
          {summaries.filter(summary => summary.props.round === round)}
        </React.Fragment>
      ))
    }

    return schedule;
  }
  
}

export default GameSchedule;
