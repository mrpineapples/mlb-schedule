export default class DataTransformer {
    static formatDate = (date) => {
        const dateConverted = new Date(date);
        const dateOptions = { weekday: "long", month: "short", day: "numeric" };
        const newDate = dateConverted.toLocaleDateString("default", dateOptions);
        return newDate;
    };

    static cleanMlbData = (mlbData) => {
        const postseasonData = mlbData.series.map((round) => {
            const seriesId = round.series.id;

            const newGames = round.games.map((game) => {
                const gameDate = this.formatDate(game.gameDate);
                const awayTeam = game.teams.away;
                const homeTeam = game.teams.home;
                // console.log('game.decisions.winner', game.decisions.winner);
                const winningPitcher =
                    game && game.decisions && game.decisions.winner && game.decisions.winner.initLastName;
                const winnerUrlSlug = game && game.decisions && game.decisions.winner && game.decisions.winner.nameSlug;
                const losingPitcher =
                    game && game.decisions && game.decisions.winner && game.decisions.loser.initLastName;
                const loserUrlSlug = game && game.decisions && game.decisions.winner && game.decisions.loser.nameSlug;
                const savePitcher =
                    game && game.decisions && game.decisions.save ? game.decisions.save.initLastName : null;
                const saveUrlSlug = game && game.decisions && game.decisions.save ? game.decisions.save.nameSlug : null;

                const pitchers = {
                    winningPitcher,
                    winnerUrlSlug,
                    losingPitcher,
                    loserUrlSlug,
                    savePitcher,
                    saveUrlSlug,
                };

                const cleanedData = {
                    ...game,
                    gameDate,
                    seriesId,
                    awayTeam,
                    homeTeam,
                    pitchers,
                };
                return cleanedData;
            });

            return newGames;
        });
        return postseasonData;
    };

    static createGamesList = (cleanedMlbData) => {
        const games = cleanedMlbData.flat();
        return games;
    };

    static createRoundsList = (cleanedMlbData) => {
        const roundsSet = new Set();

        const games = this.createGamesList(cleanedMlbData);

        games.forEach((game) => {
            const round = game.seriesId;
            roundsSet.add(round);
        });

        const rounds = [...roundsSet];

        // Business Logic 77-84, hardcode the proper array since the order of the series is constant YOY.
        const order = [0, 1, 2, 3, 5, 4, 6, 7, 8];
        const orderedRounds = [];

        for (let i = 0; i <= order.length - 1; i++) {
            const properIdx = order[i];
            const data = rounds[i];
            orderedRounds[properIdx] = data;
        }

        return orderedRounds;
    };

    static createGameDates = (cleanedMlbData) => {
        const datesSet = new Set();

        const games = this.createGamesList(cleanedMlbData);

        games.sort((a, b) => {
            // Add current year to date to ensure sort works in all browsers
            const seasonYear = a.season;
            const dateA = new Date(`${a.gameDate}, ${seasonYear}`);
            const dateB = new Date(`${b.gameDate}, ${seasonYear}`);
            return dateA - dateB;
        });

        games.forEach((game) => {
            const calendarDate = game.gameDate;
            datesSet.add(calendarDate);
        });

        const gameDates = [...datesSet];
        return gameDates;
    };
}
