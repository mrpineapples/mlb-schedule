import React from "react";
import styled from "styled-components";
import broadcastNameToLogo from "../lib/util/broadcastNameToLogo";
import teamNameToLogo from "../lib/util/teamNameToLogo";

const Wrapper = styled.div`
    margin: 0rem 1rem 0rem 1rem;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding-top: 0.2rem;
`;

const Status = styled.span`
    color: #666;
    font-size: 0.8rem;
    font-weight: 600;
`;

const Summary = styled.div`
    display: grid;
    align-items: center;
    grid-template-rows: ${(props) => (props.sort === "round" ? "16% 20% 16% 16% 16% 16%" : "20% 20% 20% 20% 20%")};
    width: 100%;
    margin: 0.5rem 0 1rem 0;
    font-size: 1rem;

    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            color: #147cd1;
        }
    }

    .date {
        order: -1;
    }

    .matchup {
        order: -1;

        & img {
            vertical-align: middle;
            margin-right: 0.5rem;
        }

        & #amp {
            font-size: 0.9rem;
            margin-right: 0.25rem;
        }
    }

    .pitchers {
        order: -1;

        & span {
            margin-right: 0.5rem;
        }

        & a {
            color: #147cd1;
        }
    }

    .highlights {
        text-align: right;
        margin-right: 0.5rem;

        & a {
            padding-left: 0.5rem;

            &:hover {
                color: #555;
            }
        }
    }

    @media (min-width: 568px) {
        display: grid;
        align-items: center;
        font-size: 0.75rem;
        grid-template-rows: none;
        grid-template-columns: ${(props) => (props.sort === "round" ? "8% 40% 8% 8% 21% 15%" : "40% 10% 10% 22% 18%")};

        .matchup {
            order: 0;
        }

        .pitchers {
            order: 0;
            margin-left: 1.25rem;
        }

        .pitchers > * {
            display: block;
        }
    }

    @media (min-width: 768px) {
        grid-template-columns: ${(props) => (props.sort === "round" ? "8% 35% 8% 8% 26% 15%" : "35% 10% 10% 20% 25%")};
        font-size: 1rem;

        .highlights {
            font-size: 0.75rem;
        }
    }

    @media (min-width: 860px) {
        grid-template-columns: ${(props) => (props.sort === "round" ? "7% 30% 7% 7% 39% 10%" : "30% 7% 7% 45% 11%")};
        align-items: center;

        .pitchers > * {
            display: inline;
        }
    }
`;

const StyledDate = styled.div`
    display: inline-block;
    width: 5rem;
`;

const removeSpaceAndLower = (name) => {
    return name.toLowerCase().replace(/\s/g, "");
};

const GameSummary = (props) => {
    // Only used when sorting by round
    const gameMonthAndDate = props.date.split(",")[1];

    const seriesStatus = `${props.seriesStatus.shortDescription} - ${props.seriesStatus.result}`;
    const awayTeam = props.awayTeamData.team.teamName;
    const awayTeamLogo = teamNameToLogo(removeSpaceAndLower(awayTeam));
    const awayScore = props.awayTeamData.score;
    const homeTeam = props.homeTeamData.team.teamName;
    const homeTeamLogo = teamNameToLogo(removeSpaceAndLower(homeTeam));
    const homeScore = props.homeTeamData.score;
    const gameFinal =
        props.linescore && props.linescore.scheduledInnings !== props.linescore.currentInning
            ? `F/${props.linescore.currentInning}`
            : "FINAL";
    const broadcastImg = broadcastNameToLogo(props.broadcast.find((obj) => obj.isNational).callSign);
    const { winningPitcher } = props.pitcherDecisions;
    const { winnerUrlSlug } = props.pitcherDecisions;
    const { losingPitcher } = props.pitcherDecisions;
    const { loserUrlSlug } = props.pitcherDecisions;
    const { savePitcher } = props.pitcherDecisions;
    const { saveUrlSlug } = props.pitcherDecisions;
    const baseUrl = `https://www.mlb.com`;
    const awayTeamUrl = `${baseUrl}/${removeSpaceAndLower(awayTeam)}`;
    const homeTeamUrl = `${baseUrl}/${removeSpaceAndLower(homeTeam)}`;

    return (
        <Wrapper>
            <Status>{seriesStatus}</Status>
            <Summary sort={props.sortBy}>
                {props.sortBy === "round" ? <StyledDate className="date">{gameMonthAndDate}</StyledDate> : null}
                <div className="matchup">
                    <a href={awayTeamUrl} target="_blank" className="away" rel="noopener noreferrer">
                        {awayTeamLogo}
                        {`${awayTeam} ${awayScore}`}
                    </a>
                    <span id="amp"> @ </span>
                    <a href={homeTeamUrl} target="_blank" className="home" rel="noopener noreferrer">
                        {homeTeamLogo}
                        {`${homeTeam} ${homeScore}`}
                    </a>
                </div>

                <div className="status">
                    <a href={`${baseUrl}/gameday/${props.gameId}`} target="_blank" rel="noopener noreferrer">
                        {gameFinal}
                    </a>
                </div>

                <div className="tv">{broadcastImg}</div>

                <div className="pitchers">
                    <span>
                        {" "}
                        W:{" "}
                        <a href={`${baseUrl}/player/${winnerUrlSlug}`} target="_blank" rel="noopener noreferrer">
                            {winningPitcher}
                        </a>
                    </span>
                    <span>
                        {" "}
                        L:{" "}
                        <a href={`${baseUrl}/player/${loserUrlSlug}`} target="_blank" rel="noopener noreferrer">
                            {losingPitcher}
                        </a>
                    </span>
                    {savePitcher ? (
                        <span>
                            {" "}
                            SV:{" "}
                            <a href={`${baseUrl}/player/${saveUrlSlug}`} target="_blank" rel="noopener noreferrer">
                                {savePitcher}
                            </a>
                        </span>
                    ) : null}
                </div>

                <div className="highlights">
                    <a
                        href={`${baseUrl}/gameday/${props.gameId}/final/wrap`}
                        target="_blank"
                        id="wrapup"
                        rel="noopener noreferrer"
                    >
                        Wrap
                    </a>

                    <a
                        href={`${baseUrl}/gameday/${props.gameId}/final/video`}
                        target="_blank"
                        id="video"
                        rel="noopener noreferrer"
                    >
                        Video
                    </a>
                </div>
            </Summary>
        </Wrapper>
    );
};

export default GameSummary;
