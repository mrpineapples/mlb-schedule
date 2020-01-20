import React from "react";
import styled from "styled-components";
import SortButton from "./SortButton";

const ButtonGroup = styled.div`
    margin: 1rem auto;
    text-align: center;
`;

const SortOptions = (props) => {
    return (
        <>
            <ButtonGroup>
                <SortButton active={props.isDateActive} onClick={props.dateClick}>
                    By Date
                </SortButton>
                <SortButton active={props.isRoundActive} onClick={props.roundClick}>
                    By Round
                </SortButton>
            </ButtonGroup>
        </>
    );
};

export default SortOptions;
