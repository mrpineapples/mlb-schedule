export default class DataTransformer {
  static formatDate = date => {
    const dateConverted = new Date(date)
    const dateOptions = { weekday: 'long', month: "short", day: 'numeric' };
    const newDate = dateConverted.toLocaleDateString("default", dateOptions)
    return newDate
  }

  static cleanMlbData = mlbData => {
    let postseasonData = mlbData.series.map(round => { 
      let seriesId = round.series.id

      let newGames = round.games.map(game => {
        let gameDate = this.formatDate(game.gameDate)
        let awayTeam = game.teams.away
        let homeTeam = game.teams.home
        let winningPitcher = game.decisions.winner.initLastName
        let winnerUrlSlug = game.decisions.winner.nameSlug
        let losingPitcher = game.decisions.loser.initLastName
        let loserUrlSlug = game.decisions.loser.nameSlug
        let savePitcher = game.decisions.save ? game.decisions.save.initLastName : null;
        let saveUrlSlug = game.decisions.save ? game.decisions.save.nameSlug : null;

        let pitchers = {
          winningPitcher,
          winnerUrlSlug,
          losingPitcher,
          loserUrlSlug,
          savePitcher,
          saveUrlSlug
        }

        let cleanedData = { 
          ...game,
          gameDate,
          seriesId,
          awayTeam,
          homeTeam,
          pitchers,
        }
        return cleanedData
      })

      return newGames
    })
    return postseasonData
  }

  static createGamesList = cleanedMlbData => {
    let games = cleanedMlbData.flat()
    return games
  }

  static createRoundsList = cleanedMlbData => {
    let roundsSet = new Set();

    let games = this.createGamesList(cleanedMlbData)

    games.forEach(game => {
      let round = game.seriesId
      roundsSet.add(round)
    })

    let rounds = [...roundsSet];
    
    // Business Logic 77-84, I could hardcode the proper array since the order of the series is constant YOY.
    let order = [9, 0, 1, 2, 3, 6, 4, 5, 8, 7];
    let orderedRounds = [];

    for (let i = 0; i <= order.length - 1; i++) {
      let properIdx = order[i]
      let data = rounds[i]
      orderedRounds[properIdx] = data
    }

    return orderedRounds
  }

  static createGameDates = cleanedMlbData => {
    let datesSet = new Set()

    let games = this.createGamesList(cleanedMlbData)

    games.sort((a, b) => {
      // Add current year to date to ensure sort works in all browsers
      let seasonYear = a.season
      let dateA = new Date(`${a.gameDate}, ${seasonYear}`)
      let dateB = new Date(`${b.gameDate}, ${seasonYear}`)
      return dateA - dateB
    })
   
    games.forEach(game => {
      let calendarDate = game.gameDate
      datesSet.add(calendarDate)
    })

    let gameDates = [...datesSet]
    return gameDates
  }
}