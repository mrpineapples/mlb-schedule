import React, { useState, useEffect } from "react";
import GameSummary from "./GameSummary";
import GameDate from "./GameDate";
import SeriesType from "./SeriesType";
import DataTransformer from "../lib/DataTransformer";

const url =
    "https://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)";

const GameSchedule = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((jsonData) => {
                const cleanedData = DataTransformer.cleanMlbData(jsonData);
                const rounds = DataTransformer.createRoundsList(cleanedData);
                const games = DataTransformer.createGamesList(cleanedData);
                const gameDates = DataTransformer.createGameDates(cleanedData);

                return setData({
                    rounds,
                    games,
                    gameDates,
                });
            })
            .catch((err) => console.log(err));
    }, []);

    if (!data) {
        return null;
    }

    const { games } = data;
    const { rounds } = data;
    const { gameDates } = data;

    const summaries = games.map((game) => (
        <GameSummary
            sortBy={props.sort}
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
    ));

    let schedule = gameDates.map((date) => (
        <React.Fragment key={date}>
            <GameDate date={date} />
            {summaries.filter((summary) => summary.props.date === date)}
        </React.Fragment>
    ));

    if (props.sort === "round") {
        schedule = rounds.map((round) => (
            <React.Fragment key={round}>
                <SeriesType round={round} />
                {summaries.filter((summary) => summary.props.round === round)}
            </React.Fragment>
        ));
    }

    return schedule;
};

export default GameSchedule;
