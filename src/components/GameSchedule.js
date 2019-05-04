import React, { Component } from 'react';
import GameSummary from './GameSummary';
import GameDate from './GameDate';
import SeriesType from './SeriesType';
import { formatDate } from "../util/dataUtilities"

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
  
  _transformData = () => {
    // console.log(this.state.data.series)
    let bracketSeries = this.state.data.series.map(round => {
      
      // _addSeriesIdToEachGame
      let seriesId = round.series.id
      let newGames = round.games.map(game => {

        let awayTeam = game.teams.away.team.teamName
        let homeTeam = game.teams.home.team.teamName

        let winningPitcher = game.decisions.winner.initLastName
        let winnerUrlSlug = game.decisions.winner.nameSlug
        let losingPitcher = game.decisions.loser.initLastName
        let loserUrlSlug = game.decisions.loser.nameSlug
        let savePitcher = game.decisions.save ? game.decisions.save.initLastName : null;
        let saveUrlSlug = game.decisions.save ? game.decisions.save.nameSlug : null;

        let data = { 
          ...game, 
          seriesId,
          awayTeam,
          homeTeam,

          winningPitcher,
          winnerUrlSlug,
          losingPitcher,
          loserUrlSlug,
          savePitcher,
          saveUrlSlug
        }
    
        return data

      })
      round.games = newGames
      return round
    })

    return bracketSeries
  }

  render() {
    if (this.state.data === null) {
      return null
    }

    let games = [];
    this.state.data.series.forEach(series => games.push(series.games))
    games = games.flat()

    let gameDates = games.map(item => new Date(item.gameDate)).sort((a,b) => a - b)
    gameDates = [...new Set(gameDates.map(date => formatDate(date)))]

    const rounds = [...new Set(games.map(item => item.seriesDescription))]
    // Push world series to end of Array so series are in order
    rounds.push(rounds.shift());

    // For now im passing a lot of props, will get back to it if I have some time
    // My thought here was to make an array with all the game summaries (35) and then filter the ones needed per game day. Components are just objects in the end
    let summaries = games.map(game => 
      <GameSummary
        sortBy={this.props.sort}
        // seriesMetaData={...}
        key={game.gamePk}
        gameId={game.gamePk}
        seriesStatus={`${game.seriesStatus.shortDescription} - ${game.seriesStatus.result}`}
        round={game.seriesDescription}
        final={game.linescore.scheduledInnings !== game.linescore.currentInning ? `F/${game.linescore.currentInning}`: "FINAL"}
        date={formatDate(game.gameDate)}
        broadcast={game.broadcasts.find(obj => obj.isNational).callSign}
        // awayTeamData={....}
        awayTeam={game.teams.away.team.teamName}
        awayScore={game.teams.away.score}
        // homeTeamData={...}
        homeTeam={game.teams.home.team.teamName}
        homeScore={game.teams.home.score}
        // decisions={...}
        winningPitcher={game.decisions.winner.initLastName}
        winnerUrlSlug={game.decisions.winner.nameSlug}
        losingPitcher={game.decisions.loser.initLastName}
        loserUrlSlug={game.decisions.loser.nameSlug}
        savePitcher={game.decisions.save ? game.decisions.save.initLastName : null}
        saveUrlSlug={game.decisions.save ? game.decisions.save.nameSlug : null}
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
