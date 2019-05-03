import React, { Component } from 'react';
import GameSummary from './GameSummary';
import GameDate from './GameDate';
import SeriesType from './SeriesType';

const url = "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"

class GameSchedule extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(jsonData => this.setState({data: jsonData}))
      .catch(err => console.log(err))
  }
  
  render() {
    if (this.state.data === null) {
      return null
    }

    let games = [];
    this.state.data.series.forEach(series => games.push(series.games))
    games = games.flat()
    console.log(games)

    const gameDates = [...new Set(games.map(item => item.gameDate.split("T")[0]).sort())]
    const rounds = [...new Set(games.map(item => item.seriesDescription))]
    // Push world series to end of Array so series are in order
    rounds.push(rounds.shift());

    // For now im passing a lot of props, will get back to it if I have some time
    // My thought here was to make an array with all the game summaries (35) and then filter the ones needed per game day. Components are just objects in the end
    let summaries = games.map(game => 
      <GameSummary
        key={game.gamePk}
        gameId={game.gamePk}
        seriesStatus={`${game.seriesStatus.shortDescription} - ${game.seriesStatus.result}`}
        awayTeam={game.teams.away.team.teamName}
        awayScore={game.teams.away.score}
        homeTeam={game.teams.home.team.teamName}
        homeScore={game.teams.home.score}
        broadcast={game.broadcasts.find(obj => obj.isNational).callSign}
        winningPitcher={game.decisions.winner.initLastName}
        winnerUrlSlug={game.decisions.winner.nameSlug}
        losingPitcher={game.decisions.loser.initLastName}
        loserUrlSlug={game.decisions.loser.nameSlug}
        savePitcher={game.decisions.save ? game.decisions.save.initLastName : null}
        saveUrlSlug={game.decisions.save ? game.decisions.save.nameSlug : null}
        final={game.linescore.scheduledInnings !== game.linescore.currentInning ? `F/${game.linescore.currentInning}`: "FINAL"}
        date={game.gameDate.split("T")[0]}
        round={game.seriesDescription}
        sortBy={this.props.sort}
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
