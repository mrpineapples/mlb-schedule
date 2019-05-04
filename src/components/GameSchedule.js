import React, { Component } from 'react';
import GameSummary from './GameSummary';
import GameDate from './GameDate';
import SeriesType from './SeriesType';
import { formatDate } from "../util/dataUtilities"

const url = "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)"

class GameSchedule extends Component {
  state = {
    postseasonData: null,
    gameDates: null
  }

  componentDidMount() {    
    fetch(url)
      .then(res => res.json())
      .then(jsonData => {
        let cleanedData = this._cleanMlbData(jsonData)
        let rounds = this._createRoundsList(jsonData)
        let games = this._createGamesList(jsonData)
        let gameDates = this._createGameDates(jsonData)
        
        return this.setState({
          postseasonData: cleanedData,
          rounds: rounds,
          games: games,
          gameDates: gameDates
        })
      })
      .catch(err => console.log(err));
  }

  _cleanMlbData = mlbData => {
    let postseasonData = mlbData.series.map(round => { 
      let seriesId = round.series.id

      let newGames = round.games.map(game => {
        // need all team data so should stop at game.teams.away/home
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

      return newGames
    })
    return postseasonData
  }

  _createRoundsList = mlbData => {
    let roundsSet = new Set();

    let games = mlbData.series.map(round => round.games).flat()
    
    games.forEach(game => {
      let round = game.seriesDescription
      roundsSet.add(round)
    })

    let rounds = [...roundsSet];

    // Push world series to end of Array so series are in order
    rounds.push(rounds.shift());
    return rounds
  }

  _createGamesList = mlbData => {
    let games = mlbData.series.map(round => round.games).flat()
    return games
  }

  _createGameDates = mlbData => {
    let datesSet = new Set()

    let games = mlbData.series.map(round => round.games).flat()
    games.sort((a, b) => { 
      let dateA = new Date(a.gameDate)
      let dateB = new Date(b.gameDate)
      return dateA - dateB
    })
   
    games.forEach(game => {
      let calendarDate = formatDate(game.gameDate)
      datesSet.add(calendarDate)
    })

    let gameDates = [...datesSet]
    return gameDates
  }

 

  render() {
    if (!this.state.postseasonData) {
      return null
    }

    const games = this.state.games
    const rounds = this.state.rounds
    const gameDates = this.state.gameDates

    // For now im passing a lot of props, will get back to it if I have some time
    // My thought here was to make an array with all the game summaries (35) and then filter the ones needed per game day. Components are just objects in the end
    let summaries = games.map(game => 
      <GameSummary
        sortBy={this.props.sort}
        // seriesMetaData={...}
        key={game.gamePk}
        gameId={game.gamePk}
        seriesStatus={game.seriesStatus}
        round={game.seriesDescription}
        linescore={game.linescore}
        date={formatDate(game.gameDate)}
        broadcast={game.broadcasts}
        // awayTeamData={....}
        awayTeamData={game.teams.away}
        // homeTeamData={...}
        homeTeamData={game.teams.home}
        // decisions={...}
        decisions={game.decisions}
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
